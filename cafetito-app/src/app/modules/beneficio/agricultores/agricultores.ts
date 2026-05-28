import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BeneficioService } from '../../../core/services/beneficio';
import { Agricultor, Cuenta } from '../../../core/models/models';

@Component({
  standalone: false,
  selector: 'app-agricultores',
  templateUrl: './agricultores.html',
  styleUrls: ['./agricultores.css']
})
export class AgricultoresComponent implements OnInit {

  agricultores: Agricultor[] = [];
  agricultorSeleccionado: any = null;

  cuentasAgricultor: Cuenta[] = [];

  loading = false;
  loadingDetalle = false;

  error = '';
  mensaje = '';

  filtroNit = '';

  vistaPantalla: 'LISTA' | 'DETALLE' = 'LISTA';

  constructor(
    private beneficioService: BeneficioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;
    this.error = '';
    this.mensaje = '';
    this.vistaPantalla = 'LISTA';
    this.agricultorSeleccionado = null;

    this.beneficioService.listarAgricultores().subscribe({
      next: data => {
        this.agricultores = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.agricultores = [];
        this.loading = false;
        this.error = this.obtenerMensajeError(
          err,
          'No se pudieron cargar los agricultores.'
        );
        this.cdr.detectChanges();
      }
    });
  }

  buscarPorNit(): void {
    const nit = String(this.filtroNit || '').trim();

    if (!nit) {
      this.cargarDatos();
      return;
    }

    this.loading = true;
    this.error = '';
    this.mensaje = '';
    this.agricultorSeleccionado = null;
    this.vistaPantalla = 'LISTA';

    this.beneficioService.buscarAgricultoresPorNit(nit).subscribe({
      next: data => {
        this.agricultores = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.agricultores = [];
        this.loading = false;
        this.error = this.obtenerMensajeError(
          err,
          'No se pudo buscar agricultores por NIT.'
        );
        this.cdr.detectChanges();
      }
    });
  }

  limpiarFiltros(): void {
    this.filtroNit = '';
    this.cargarDatos();
  }

  verDetalle(agricultor: Agricultor): void {
    const idAgricultor = Number(agricultor.idAgricultor);

    if (!idAgricultor) {
      this.error = 'El agricultor seleccionado no tiene ID válido.';
      return;
    }

    this.loadingDetalle = true;
    this.error = '';
    this.mensaje = '';
    this.cuentasAgricultor = [];

    this.beneficioService.obtenerDetalleAgricultor(idAgricultor).subscribe({
      next: detalle => {
        this.agricultorSeleccionado = detalle;
        this.vistaPantalla = 'DETALLE';

        this.beneficioService.listarCuentasPorAgricultor(idAgricultor).subscribe({
          next: cuentas => {
            this.cuentasAgricultor = cuentas || [];

            this.agricultorSeleccionado.cantidadCuentas =
              this.cuentasAgricultor.length;

            this.loadingDetalle = false;
            this.cdr.detectChanges();
          },
          error: err => {
            this.cuentasAgricultor = [];
            this.agricultorSeleccionado.cantidadCuentas = 0;
            this.loadingDetalle = false;

            this.error = this.obtenerMensajeError(
              err,
              'No se pudieron cargar las cuentas del agricultor.'
            );

            this.cdr.detectChanges();
          }
        });
      },
      error: err => {
        this.agricultorSeleccionado = null;
        this.loadingDetalle = false;
        this.error = this.obtenerMensajeError(
          err,
          'No se pudo cargar el detalle del agricultor.'
        );
        this.cdr.detectChanges();
      }
    });
  }

  regresarLista(): void {
    this.vistaPantalla = 'LISTA';
    this.agricultorSeleccionado = null;
    this.cuentasAgricultor = [];
    this.error = '';
    this.mensaje = '';
  }

  obtenerEstado(a: any): string {
    if (a?.activo === false || a?.estado === 0) {
      return 'Inactivo';
    }

    return 'Activo';
  }

  obtenerBadgeEstado(a: any): string {
    if (a?.activo === false || a?.estado === 0) {
      return 'bg-secondary';
    }

    return 'bg-success';
  }

  obtenerFechaCreacion(a: any): any {
    return a?.fechaCreacion || null;
  }

  obtenerObservaciones(a: any): string {
    return a?.observaciones || '-';
  }

  obtenerCantidadCuentas(): number {
    return Number(this.agricultorSeleccionado?.cantidadCuentas || 0);
  }

  obtenerCantidadTransportes(): number {
    return Number(this.agricultorSeleccionado?.cantidadTransportes || 0);
  }

  obtenerCantidadTransportistas(): number {
    return Number(this.agricultorSeleccionado?.cantidadTransportistas || 0);
  }

  obtenerMensajeError(err: any, mensajeDefault: string): string {
    return err?.error?.mensaje ||
           err?.error?.error ||
           err?.message ||
           mensajeDefault;
  }
}