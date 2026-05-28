import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DetalleCatalogo, Pesaje } from '../../../core/models/models';
import { PesajesService } from '../../../core/services/pesajes';
import { CatalogosService } from '../../../core/services/catalogos';

@Component({
  standalone: false,
  selector: 'app-pesajes',
  templateUrl: './pesajes.html',
  styleUrls: ['./pesajes.css']
})
export class PesajesComponent implements OnInit {

  pesajes: Pesaje[] = [];
  medidas: DetalleCatalogo[] = [];
  cuentasDisponibles: any[] = [];

  loading = false;
  showForm = false;
  mensajeExito = '';
  mensajeError = '';

  form!: FormGroup;

  constructor(
    private pesajesService: PesajesService,
    private catalogosService: CatalogosService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idCuenta: ['', Validators.required],
      medida: ['', Validators.required],
      pesoTotalActual: [null, [Validators.required, Validators.min(1)]],
      observaciones: ['']
    });

    this.cargarMedidas();
    this.cargarCuentasDisponibles();
    this.cargarDatos();
  }

  cargarMedidas(): void {
    this.catalogosService.listarMedidas().subscribe({
      next: data => {
        this.medidas = data || [];
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensajeError = 'No se pudieron cargar las medidas';
        this.cdr.detectChanges();
      }
    });
  }

  cargarCuentasDisponibles(): void {
    this.pesajesService.listarCuentasDisponibles().subscribe({
      next: data => {
        this.cuentasDisponibles = data || [];
        this.cdr.detectChanges();
      },
      error: err => {
        this.cuentasDisponibles = [];
        this.mensajeError =
          err?.error?.error ||
          'No se pudieron cargar las cuentas disponibles';
        this.cdr.detectChanges();
      }
    });
  }

  cargarDatos(): void {
    this.loading = true;
    this.mensajeError = '';

    this.pesajesService.listar().subscribe({
      next: data => {
        this.pesajes = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.pesajes = [];
        this.loading = false;
        this.mensajeError =
          err?.error?.error ||
          'Error cargando pesajes';
        this.cdr.detectChanges();
      }
    });
  }

  nuevo(): void {
    this.showForm = true;
    this.form.reset();
    this.mensajeExito = '';
    this.mensajeError = '';
    this.cargarCuentasDisponibles();
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const cuenta = this.obtenerCuentaSeleccionada();

    if (!cuenta) {
      this.mensajeError = 'Debe seleccionar una cuenta válida';
      return;
    }

    const peso = Number(this.form.value.pesoTotalActual);

    if (cuenta.saldoPendiente != null && peso > Number(cuenta.saldoPendiente)) {
      this.mensajeError = 'El peso supera el saldo pendiente de la cuenta';
      return;
    }

    const body: Pesaje = {
      idCuenta: Number(this.form.value.idCuenta),
      noCuenta: String(this.form.value.idCuenta),
      medida: {
        idDetalleCatalogo: Number(this.form.value.medida)
      },
      pesoTotalActual: peso,
      observaciones: this.form.value.observaciones
    };

    this.pesajesService.crear(body).subscribe({
      next: () => {
        this.showForm = false;
        this.form.reset();
        this.mensajeExito = 'Pesaje creado correctamente';
        this.cargarCuentasDisponibles();
        this.cargarDatos();
      },
      error: (err: any) => {
        this.mensajeError =
          err?.error?.error ||
          'No se pudo crear el pesaje';
        this.cdr.detectChanges();
      }
    });
  }

  obtenerCuentaSeleccionada(): any {
    const idCuenta = Number(this.form.value.idCuenta);

    return this.cuentasDisponibles.find(
      c => Number(c.idCuenta) === idCuenta
    );
  }

  verDetalle(pesaje: Pesaje): void {
    if (!pesaje.idPesaje) {
      return;
    }

    this.router.navigate([
      '/agricultor/pesajes',
      pesaje.idPesaje,
      'parcialidades'
    ]);
  }

  finalizar(pesaje: Pesaje): void {
    if (!pesaje.idPesaje) {
      return;
    }

    const confirmar =
      confirm('¿Desea finalizar el pesaje?');

    if (!confirmar) {
      return;
    }

    this.pesajesService.finalizar(pesaje.idPesaje).subscribe({
      next: () => {
        this.mensajeExito = 'Pesaje finalizado correctamente';
        this.cargarCuentasDisponibles();
        this.cargarDatos();
      },
      error: (err: any) => {
        this.mensajeError =
          err?.error?.error ||
          'No se pudo finalizar el pesaje';
        this.cdr.detectChanges();
      }
    });
  }

  puedeFinalizar(pesaje: Pesaje): boolean {
    const cantidad = pesaje.cantidadParcialidades || 0;
    const estado = pesaje.estado?.idDetalleCatalogo;

    return cantidad > 0 && estado === 2;
  }

  cancelar(): void {
    this.showForm = false;
    this.form.reset();
  }

  obtenerMedida(id?: number): string {
    return this.medidas.find(
      m => Number(m.idDetalleCatalogo) === Number(id)
    )?.valor || 'Sin medida';
  }

  obtenerEstado(pesaje: Pesaje): string {
    return pesaje.estado?.valor ||
      this.obtenerEstadoPorId(
        pesaje.estado?.idDetalleCatalogo
      );
  }

  obtenerEstadoPorId(id?: number): string {
    switch (id) {
      case 2:
        return 'Pesaje Iniciado';
      case 3:
        return 'Pesaje Finalizado';
      default:
        return 'Sin estado';
    }
  }
}