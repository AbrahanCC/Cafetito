import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  Licencia,
  Transportista
} from '../../../core/models/models';

import { CatalogosService } from '../../../core/services/catalogos';

@Component({
  standalone: false,
  selector: 'app-transportistas-agricultor',
  templateUrl: './transportistas.html',
  styleUrls: ['./transportistas.css']
})
export class TransportistasAgricultorComponent implements OnInit {

  transportistas: Transportista[] = [];
  licencias: Licencia[] = [];

  loading = false;
  showForm = false;
  procesando = false;

  error = '';
  mensajeExito = '';

  form: FormGroup;

  private apiUrl = 'http://localhost:8090/api/agricultor/transportistas';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private catalogosService: CatalogosService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      cui: ['', Validators.required],
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      tipoLicencia: ['', Validators.required],
      fechaVenciLicencia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarLicencias();
    this.cargarDatos();
  }

  cargarLicencias(): void {
    this.catalogosService.listarLicencias().subscribe({
      next: data => {
        this.licencias = data || [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.licencias = [];
        this.error = 'No se pudieron cargar las licencias.';
        this.cdr.detectChanges();
      }
    });
  }

  cargarDatos(): void {
    this.loading = true;
    this.error = '';

    this.http.get<Transportista[]>(this.apiUrl).subscribe({
      next: data => {
        this.transportistas = Array.isArray(data) ? data : [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.transportistas = [];
        this.loading = false;
        this.error = this.obtenerMensajeError(err, 'No se pudieron cargar los transportistas.');
        this.cdr.detectChanges();
      }
    });
  }

  nuevo(): void {
    this.showForm = true;
    this.error = '';
    this.mensajeExito = '';
    this.form.reset({
      cui: '',
      nombre: '',
      fechaNacimiento: '',
      tipoLicencia: '',
      fechaVenciLicencia: ''
    });
  }

  guardar(): void {
    if (this.procesando) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = '';
    this.mensajeExito = '';
    this.procesando = true;

    const body = {
      cui: String(this.form.value.cui || '').trim(),
      nombre: String(this.form.value.nombre || '').trim(),
      fechaNacimiento: this.form.value.fechaNacimiento,
      tipoLicencia: {
        idCatalogo: Number(this.form.value.tipoLicencia)
      },
      fechaVenciLicencia: this.form.value.fechaVenciLicencia
    };

    this.http.post(this.apiUrl, body).subscribe({
      next: () => {
        this.procesando = false;
        this.showForm = false;
        this.form.reset();
        this.mensajeExito = 'Transportista creado correctamente.';
        this.cargarDatos();
      },
      error: err => {
        this.procesando = false;
        this.error = this.obtenerMensajeError(err, 'Error al guardar transportista.');
        this.cdr.detectChanges();
      }
    });
  }

  cancelar(): void {
    if (this.procesando) {
      return;
    }

    this.showForm = false;
    this.form.reset();
  }

  obtenerNombreLicencia(id?: number): string {
    const licencia = this.licencias.find(
      l => Number(l.idCatalogo) === Number(id)
    );

    return licencia ? licencia.nombre : 'Sin licencia';
  }

  obtenerEstado(estado?: number): string {
    if (estado === 1) {
      return 'Activo';
    }

    if (estado === 0) {
      return 'Inactivo';
    }

    return 'Activo';
  }

  obtenerMensajeError(err: any, mensajeDefault: string): string {
    return err?.error?.mensaje ||
           err?.error?.error ||
           err?.message ||
           mensajeDefault;
  }
}