import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-parcialidades',
  standalone: false,
  templateUrl: './parcialidades.html',
  styleUrls: ['./parcialidades.css']
})
export class Parcialidades implements OnInit {

  idPesaje!: number;

  pesaje: any = null;
  parcialidades: any[] = [];
  transportes: any[] = [];
  transportistas: any[] = [];

  loading = false;
  loadingPesaje = false;
  loadingDisponibles = false;
  procesando = false;

  error = '';
  mensajeExito = '';
  showForm = false;

  form: FormGroup;

  private readonly apiPesajes =
    `${environment.apiGatewayUrl}${environment.endpoints.agricultor}/pesajes`;

  private readonly apiTransportes =
    `${environment.apiGatewayUrl}${environment.endpoints.agricultor}/transportes/disponibles`;

  private readonly apiTransportistas =
    `${environment.apiGatewayUrl}${environment.endpoints.agricultor}/transportistas/disponibles`;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      placa: ['', Validators.required],
      idTransportista: ['', Validators.required],
      pesoActual: ['', [Validators.required, Validators.min(0.01)]],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    this.idPesaje = Number(this.route.snapshot.paramMap.get('idPesaje'));

    if (!this.idPesaje) {
      this.error = 'No se encontró el pesaje seleccionado.';
      return;
    }

    this.cargarTodo();
  }

  cargarTodo(): void {
    this.cargarDetallePesaje();
    this.cargarParcialidades();
    this.cargarDisponibles();
  }

  cargarDetallePesaje(): void {
    this.loadingPesaje = true;
    this.error = '';

    this.http.get<any>(`${this.apiPesajes}/${this.idPesaje}`).subscribe({
      next: data => {
        this.pesaje = data;
        this.loadingPesaje = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.loadingPesaje = false;
        this.error = this.obtenerMensajeError(err, 'No se pudo cargar el detalle del pesaje.');
        this.cdr.detectChanges();
      }
    });
  }

  cargarParcialidades(): void {
    this.loading = true;
    this.error = '';

    this.http.get<any[]>(`${this.apiPesajes}/${this.idPesaje}/parcialidades`).subscribe({
      next: data => {
        this.parcialidades = Array.isArray(data) ? data : [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.parcialidades = [];
        this.loading = false;
        this.error = this.obtenerMensajeError(err, 'No se pudieron cargar las parcialidades.');
        this.cdr.detectChanges();
      }
    });
  }

  cargarDisponibles(): void {
    this.loadingDisponibles = true;

    this.http.get<any[]>(this.apiTransportes).subscribe({
      next: data => {
        this.transportes = Array.isArray(data) ? data : [];
        this.loadingDisponibles = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.transportes = [];
        this.loadingDisponibles = false;
        this.cdr.detectChanges();
      }
    });

    this.http.get<any[]>(this.apiTransportistas).subscribe({
      next: data => {
        this.transportistas = Array.isArray(data) ? data : [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.transportistas = [];
        this.cdr.detectChanges();
      }
    });
  }

  nueva(): void {
    this.error = '';
    this.mensajeExito = '';

    if (!this.puedeCrearParcialidad()) {
      this.error = 'Solo se pueden crear parcialidades si el pesaje está iniciado.';
      return;
    }

    if (this.transportes.length === 0) {
      this.error = 'No existen transportes disponibles.';
      return;
    }

    if (this.transportistas.length === 0) {
      this.error = 'No existen transportistas disponibles.';
      return;
    }

    this.showForm = true;
    this.form.reset({
      placa: '',
      idTransportista: '',
      pesoActual: '',
      observaciones: ''
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = '';
    this.mensajeExito = '';
    this.procesando = true;

    const body = {
      placa: String(this.form.value.placa || '').trim().toUpperCase(),
      idTransportista: Number(this.form.value.idTransportista),
      pesoActual: Number(this.form.value.pesoActual),
      observaciones: this.form.value.observaciones || ''
    };

    this.http.post(`${this.apiPesajes}/${this.idPesaje}/parcialidades`, body).subscribe({
      next: () => {
        this.mensajeExito = 'Parcialidad creada correctamente y enviada al Beneficio.';
        this.showForm = false;
        this.procesando = false;
        this.form.reset();

        this.cargarDetallePesaje();
        this.cargarParcialidades();
        this.cargarDisponibles();
      },
      error: err => {
        this.procesando = false;
        this.error = this.obtenerMensajeError(err, 'Error al registrar la parcialidad.');
        this.cdr.detectChanges();
      }
    });
  }

  finalizarPesaje(): void {
    if (!this.idPesaje) {
      return;
    }

    if (this.parcialidades.length === 0) {
      this.error = 'No se puede finalizar un pesaje sin parcialidades.';
      return;
    }

    this.error = '';
    this.mensajeExito = '';
    this.procesando = true;

    this.http.put(`${this.apiPesajes}/${this.idPesaje}/finalizar`, {}).subscribe({
      next: () => {
        this.procesando = false;
        this.mensajeExito = 'Pesaje finalizado correctamente.';
        this.cargarDetallePesaje();
        this.cargarParcialidades();
        this.cdr.detectChanges();
      },
      error: err => {
        this.procesando = false;
        this.error = this.obtenerMensajeError(err, 'No se pudo finalizar el pesaje.');
        this.cdr.detectChanges();
      }
    });
  }

  cancelar(): void {
    this.showForm = false;
    this.form.reset();
  }

  regresar(): void {
    this.router.navigate(['/agricultor/pesajes']);
  }

  puedeCrearParcialidad(): boolean {
    const idEstado = this.pesaje?.estado?.idDetalleCatalogo;
    const valorEstado = String(this.pesaje?.estado?.valor || '').toUpperCase();

    return idEstado === 2 ||
           valorEstado.includes('INICIADO') ||
           valorEstado.includes('PESAJE_INICIADO');
  }

  puedeFinalizarPesaje(): boolean {
    if (!this.pesaje) {
      return false;
    }

    if (!this.puedeCrearParcialidad()) {
      return false;
    }

    return this.parcialidades.length > 0;
  }

  obtenerNoCuenta(): string {
    return this.pesaje?.idCuenta ||
           this.pesaje?.noCuenta ||
           'Sin cuenta asociada';
  }

  obtenerMedida(): string {
    return this.pesaje?.medida?.valor ||
           this.pesaje?.medida?.codigo ||
           'Sin medida';
  }

  obtenerEstadoPesaje(): string {
    return this.pesaje?.estado?.valor ||
           this.pesaje?.estado?.codigo ||
           'Sin estado';
  }

  obtenerBadgePesaje(): string {
    const idEstado = this.pesaje?.estado?.idDetalleCatalogo;
    const estado = String(this.obtenerEstadoPesaje()).toUpperCase();

    if (idEstado === 2 || estado.includes('INICIADO')) {
      return 'bg-info';
    }

    if (idEstado === 3 || estado.includes('FINALIZADO')) {
      return 'bg-success';
    }

    return 'bg-secondary';
  }

  obtenerNombreTransportista(idTransportista: number): string {
    const encontrado = this.transportistas.find(
      t => Number(t.idTransportista) === Number(idTransportista)
    );

    return encontrado ? `${encontrado.nombre} - ${encontrado.cui}` : String(idTransportista);
  }

  obtenerEstadoParcialidad(p: any): string {
    return p?.estado?.valor ||
           p?.estado?.codigo ||
           p?.estado ||
           'CREADA';
  }

  obtenerBadgeParcialidadAgricultor(p: any): string {
    const estado = String(this.obtenerEstadoParcialidad(p)).toUpperCase();

    if (estado.includes('CREADA')) {
      return 'bg-primary';
    }

    if (estado.includes('RECIBIDA')) {
      return 'bg-info';
    }

    if (estado.includes('RECHAZADA')) {
      return 'bg-danger';
    }

    if (estado.includes('FINALIZADA')) {
      return 'bg-success';
    }

    return 'bg-secondary';
  }

  obtenerFechaParcialidad(p: any): string {
    if (p?.fechaRecepcion && p?.horaRecepcion) {
      return `${p.fechaRecepcion} ${p.horaRecepcion}`;
    }

    return p?.fechaRecepcion || '-';
  }

  obtenerPesoTotalParcialidades(): number {
    return this.parcialidades.reduce((total, p) => {
      return total + Number(p?.pesoActual || 0);
    }, 0);
  }

  obtenerMensajeError(err: any, mensajeDefault: string): string {
    return err?.error?.mensaje ||
           err?.error?.error ||
           err?.message ||
           mensajeDefault;
  }
}