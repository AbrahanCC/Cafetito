import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import QRCode from 'qrcode';

import { BeneficioService } from '../../../core/services/beneficio';
import { Cuenta, Parcialidad } from '../../../core/models/models';

type VistaPantalla = 'LISTA' | 'DETALLE_CUENTA' | 'DETALLE_PARCIALIDAD';

@Component({
  standalone: false,
  selector: 'app-cuentas-beneficio',
  templateUrl: './cuentas.html',
  styleUrls: ['./cuentas.css']
})
export class CuentasBeneficioComponent implements OnInit {

  vistaPantalla: VistaPantalla = 'LISTA';

  cuentas: Cuenta[] = [];
  cuentasFiltradas: Cuenta[] = [];
  parcialidades: Parcialidad[] = [];

  cuentaSeleccionada: Cuenta | null = null;
  parcialidadSeleccionada: Parcialidad | null = null;

  qrDataUrl = '';
  mostrarPaso17 = false;

  loading = false;
  loadingParcialidades = false;
  procesandoCuenta = false;
  procesandoParcialidad = false;

  error = '';
  mensaje = '';

  showForm = false;
  showCambioEstado = false;

  form: FormGroup;
  filtrosForm: FormGroup;
  cambioEstadoForm: FormGroup;

  constructor(
    private beneficioService: BeneficioService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nitAgricultor: ['', Validators.required],
      pesoObjetivo: ['', [Validators.required, Validators.min(0.01)]]
    });

    this.filtrosForm = this.fb.group({
      fecha: [''],
      noCuenta: [''],
      estado: ['']
    });

    this.cambioEstadoForm = this.fb.group({
      estadoNuevo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarCuentas();

    this.route.queryParams.subscribe(params => {
      const vista = params['vista'];
      const idCuenta = Number(params['idCuenta']);
      const idParcialidad = Number(params['idParcialidad']);
      const paso = params['paso'];

      if (vista === 'DETALLE_PARCIALIDAD' && idCuenta && idParcialidad) {
        this.abrirDesdeQr(idCuenta, idParcialidad, paso === '17');
      }
    });
  }

  cargarCuentas(): void {
    this.loading = true;
    this.error = '';
    this.mensaje = '';

    this.beneficioService.listarCuentas().subscribe({
      next: data => {
        this.cuentas = data || [];
        this.cuentasFiltradas = [...this.cuentas];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.cuentas = [];
        this.cuentasFiltradas = [];
        this.loading = false;
        this.error = this.obtenerMensajeError(err, 'No se pudieron cargar las cuentas.');
        this.cdr.detectChanges();
      }
    });
  }

  abrirDesdeQr(idCuenta: number, idParcialidad: number, abrirPaso17: boolean): void {
    this.error = '';
    this.mensaje = '';

    this.beneficioService.obtenerCuenta(idCuenta).subscribe({
      next: cuenta => {
        this.cuentaSeleccionada = cuenta;
        this.vistaPantalla = 'DETALLE_CUENTA';

        this.beneficioService.listarParcialidadesPorCuenta(idCuenta).subscribe({
          next: parcialidades => {
            this.parcialidades = parcialidades || [];

            const parcialidad = this.parcialidades.find(
              p => Number(this.obtenerIdParcialidadBeneficio(p)) === idParcialidad
            );

            if (parcialidad) {
              this.verDetalleParcialidad(parcialidad, abrirPaso17);
            } else {
              this.error = 'No se encontró la parcialidad del QR.';
            }

            this.cdr.detectChanges();
          },
          error: err => {
            this.error = this.obtenerMensajeError(err, 'No se pudieron cargar las parcialidades.');
            this.cdr.detectChanges();
          }
        });
      },
      error: err => {
        this.error = this.obtenerMensajeError(err, 'No se pudo abrir la cuenta del QR.');
        this.cdr.detectChanges();
      }
    });
  }

  nueva(): void {
    this.showForm = true;
    this.showCambioEstado = false;
    this.error = '';
    this.mensaje = '';
    this.form.reset();
  }

  guardar(): void {
    if (this.procesandoCuenta) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = '';
    this.mensaje = '';
    this.procesandoCuenta = true;

    const cuenta: Cuenta = {
      nitAgricultor: Number(this.form.value.nitAgricultor),
      pesoObjetivo: Number(this.form.value.pesoObjetivo)
    };

    this.beneficioService.crearCuenta(cuenta).subscribe({
      next: () => {
        this.procesandoCuenta = false;
        this.mensaje = 'Cuenta creada correctamente.';
        this.showForm = false;
        this.form.reset();
        this.cargarCuentas();
      },
      error: err => {
        this.procesandoCuenta = false;
        this.error = this.obtenerMensajeError(err, 'No se pudo crear la cuenta.');
        this.cdr.detectChanges();
      }
    });
  }

  cancelar(): void {
    if (this.procesandoCuenta) {
      return;
    }

    this.showForm = false;
    this.form.reset();
  }

  buscarPorFecha(): void {
    const fecha = this.filtrosForm.value.fecha;

    if (!fecha) {
      return;
    }

    this.filtrosForm.patchValue({
      noCuenta: '',
      estado: ''
    });

    this.cuentasFiltradas = this.cuentas.filter(c => {
      if (!c.fechaEnvio) {
        return false;
      }

      return new Date(c.fechaEnvio).toISOString().substring(0, 10) === fecha;
    });
  }

  buscarPorCuenta(): void {
    const noCuenta = String(this.filtrosForm.value.noCuenta || '').trim();

    if (!noCuenta) {
      return;
    }

    this.filtrosForm.patchValue({
      fecha: '',
      estado: ''
    });

    this.cuentasFiltradas = this.cuentas.filter(c =>
      String(c.idCuenta || '').includes(noCuenta)
    );
  }

  buscarPorEstado(): void {
    const estado = String(this.filtrosForm.value.estado || '').trim().toUpperCase();

    if (!estado) {
      return;
    }

    this.filtrosForm.patchValue({
      fecha: '',
      noCuenta: ''
    });

    this.cuentasFiltradas = this.cuentas.filter(c =>
      String(c.estado || '').toUpperCase().includes(estado)
    );
  }

  limpiarFiltros(): void {
    this.filtrosForm.reset({
      fecha: '',
      noCuenta: '',
      estado: ''
    });

    this.cuentasFiltradas = [...this.cuentas];
  }

  verDetalleCuenta(cuenta: Cuenta): void {
    if (!cuenta.idCuenta) {
      return;
    }

    this.cuentaSeleccionada = cuenta;
    this.parcialidadSeleccionada = null;
    this.qrDataUrl = '';
    this.mostrarPaso17 = false;
    this.vistaPantalla = 'DETALLE_CUENTA';
    this.showForm = false;
    this.showCambioEstado = false;
    this.error = '';
    this.mensaje = '';

    this.cargarParcialidades(cuenta.idCuenta);
  }

  cargarParcialidades(idCuenta: number): void {
    this.loadingParcialidades = true;
    this.parcialidades = [];

    this.beneficioService.listarParcialidadesPorCuenta(idCuenta).subscribe({
      next: data => {
        this.parcialidades = data || [];
        this.loadingParcialidades = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.parcialidades = [];
        this.loadingParcialidades = false;
        this.error = this.obtenerMensajeError(err, 'No se pudieron cargar las parcialidades.');
        this.cdr.detectChanges();
      }
    });
  }

  regresarLista(): void {
    this.router.navigate(['/beneficio/cuentas']);
    this.vistaPantalla = 'LISTA';
    this.cuentaSeleccionada = null;
    this.parcialidadSeleccionada = null;
    this.qrDataUrl = '';
    this.mostrarPaso17 = false;
    this.showCambioEstado = false;
    this.cargarCuentas();
  }

  regresarDetalleCuenta(): void {
    this.router.navigate(['/beneficio/cuentas']);

    this.vistaPantalla = 'DETALLE_CUENTA';
    this.parcialidadSeleccionada = null;
    this.qrDataUrl = '';
    this.mostrarPaso17 = false;

    if (this.cuentaSeleccionada?.idCuenta) {
      this.cargarParcialidades(this.cuentaSeleccionada.idCuenta);
    }
  }

  puedeCambiarEstado(cuenta: Cuenta | null): boolean {
    return cuenta?.estado === 'PESAJE_FINALIZADO' ||
           cuenta?.estado === 'CUENTA_CERRADA';
  }

  abrirCambioEstado(): void {
    if (!this.cuentaSeleccionada || !this.puedeCambiarEstado(this.cuentaSeleccionada)) {
      this.error = 'La cuenta no se encuentra disponible para cambio de estado.';
      return;
    }

    this.showCambioEstado = true;
    this.cambioEstadoForm.reset();
  }

  cancelarCambioEstado(): void {
    this.showCambioEstado = false;
    this.cambioEstadoForm.reset();
  }

  cambiarEstado(): void {
    if (this.procesandoCuenta) {
      return;
    }

    if (!this.cuentaSeleccionada?.idCuenta || this.cambioEstadoForm.invalid) {
      this.cambioEstadoForm.markAllAsTouched();
      return;
    }

    this.error = '';
    this.mensaje = '';
    this.procesandoCuenta = true;

    const nuevoEstado = this.cambioEstadoForm.value.estadoNuevo;

    this.beneficioService.cambiarEstadoCuenta(
      this.cuentaSeleccionada.idCuenta,
      {
        nuevoEstado,
        diferenciaTotal: this.cuentaSeleccionada.diferenciaTotal || 0,
        observaciones: 'Cambio de estado desde Beneficio'
      }
    ).subscribe({
      next: cuentaActualizada => {
        this.procesandoCuenta = false;
        this.mensaje = 'Estado de cuenta actualizado correctamente.';
        this.cuentaSeleccionada = cuentaActualizada;
        this.showCambioEstado = false;

        if (this.cuentaSeleccionada?.idCuenta) {
          this.cargarParcialidades(this.cuentaSeleccionada.idCuenta);
        }

        this.cdr.detectChanges();
      },
      error: err => {
        this.procesandoCuenta = false;
        this.error = this.obtenerMensajeError(err, 'No se pudo cambiar el estado de la cuenta.');
        this.cdr.detectChanges();
      }
    });
  }

  verDetalleParcialidad(parcialidad: Parcialidad, abrirPaso17: boolean = false): void {
    this.parcialidadSeleccionada = parcialidad;
    this.vistaPantalla = 'DETALLE_PARCIALIDAD';
    this.mostrarPaso17 = abrirPaso17;
    this.error = '';
    this.mensaje = '';
    this.generarQrParcialidad();
  }

  generarQrParcialidad(): void {
    const idCuenta = this.cuentaSeleccionada?.idCuenta;
    const idParcialidad = this.obtenerIdParcialidadBeneficio(this.parcialidadSeleccionada);

    if (!idCuenta || !idParcialidad) {
      this.qrDataUrl = '';
      return;
    }

    const url = `${window.location.origin}/beneficio/cuentas?vista=DETALLE_PARCIALIDAD&idCuenta=${idCuenta}&idParcialidad=${idParcialidad}&paso=17`;

    QRCode.toDataURL(url)
      .then(dataUrl => {
        this.qrDataUrl = dataUrl;
        this.cdr.detectChanges();
      })
      .catch(() => {
        this.qrDataUrl = '';
        this.cdr.detectChanges();
      });
  }

  irParcialidadQr(): void {
    const idCuenta = this.cuentaSeleccionada?.idCuenta;
    const idParcialidad = this.obtenerIdParcialidadBeneficio(this.parcialidadSeleccionada);

    if (!idCuenta || !idParcialidad) {
      return;
    }

    this.mostrarPaso17 = true;

    this.router.navigate(['/beneficio/cuentas'], {
      queryParams: {
        vista: 'DETALLE_PARCIALIDAD',
        idCuenta,
        idParcialidad,
        paso: 17
      }
    });

    this.cdr.detectChanges();
  }

  puedeRecibirORechazar(parcialidad: Parcialidad | null): boolean {
    if (!parcialidad) {
      return false;
    }

    return !parcialidad.fechaRecepcionParcialidad &&
           parcialidad.estado !== 'RECIBIDA' &&
           parcialidad.estado !== 'RECHAZADA';
  }

  recibirParcialidad(): void {
    if (this.procesandoParcialidad) {
      return;
    }

    const id = this.obtenerIdParcialidadBeneficio(this.parcialidadSeleccionada);

    if (!id) {
      return;
    }

    this.error = '';
    this.mensaje = '';
    this.procesandoParcialidad = true;

    this.beneficioService.recibirParcialidad(id).subscribe({
      next: () => {
        this.procesandoParcialidad = false;
        this.mensaje = 'Parcialidad recibida correctamente.';
        this.regresarDetalleCuenta();
      },
      error: err => {
        this.procesandoParcialidad = false;
        this.error = this.obtenerMensajeError(err, 'No se pudo recibir la parcialidad.');
        this.cdr.detectChanges();
      }
    });
  }

  rechazarParcialidad(): void {
    if (this.procesandoParcialidad) {
      return;
    }

    const id = this.obtenerIdParcialidadBeneficio(this.parcialidadSeleccionada);

    if (!id) {
      return;
    }

    this.error = '';
    this.mensaje = '';
    this.procesandoParcialidad = true;

    this.beneficioService.rechazarParcialidad(id).subscribe({
      next: () => {
        this.procesandoParcialidad = false;
        this.mensaje = 'Parcialidad rechazada correctamente.';
        this.regresarDetalleCuenta();
      },
      error: err => {
        this.procesandoParcialidad = false;
        this.error = this.obtenerMensajeError(err, 'No se pudo rechazar la parcialidad.');
        this.cdr.detectChanges();
      }
    });
  }

  obtenerIdParcialidadBeneficio(p: any): number | null {
    return p?.idParcialidadBeneficio || p?.idParcialidad || null;
  }

  obtenerNombreTransportista(p: any): string {
    return p?.nombreTransportista || p?.transportista || p?.nombre || '-';
  }

  obtenerPlaca(p: any): string {
    return p?.placaTransporte || p?.placa || '-';
  }

  obtenerPeso(p: any): number {
    return p?.pesoEnviado || p?.pesoActual || 0;
  }

  obtenerTipoMedida(p: any): string {
    return p?.tipoMedida || p?.medida || '-';
  }

  obtenerFechaRecepcion(p: any): any {
    return p?.fechaRecepcionParcialidad || p?.fechaRecepcion || null;
  }

  obtenerEstadoTransporte(p: any): string {
    if (p?.estadoTransporte === 1) {
      return 'Activo';
    }

    if (p?.estadoTransporte === 0) {
      return 'Inactivo';
    }

    return p?.estadoTransporte || '-';
  }

  obtenerEstadoTransportista(p: any): string {
    if (p?.estadoTransportista === 1) {
      return 'Activo';
    }

    if (p?.estadoTransportista === 0) {
      return 'Inactivo';
    }

    return p?.estadoTransportista || '-';
  }

  obtenerBadgeEstadoCuenta(estado?: string): string {
    switch (estado) {
      case 'CUENTA_CREADA':
        return 'bg-primary';

      case 'PESAJE_INICIADO':
        return 'bg-info';

      case 'PESAJE_FINALIZADO':
        return 'bg-warning text-dark';

      case 'CUENTA_CERRADA':
        return 'bg-secondary';

      case 'CUENTA_CONFIRMADA':
        return 'bg-success';

      default:
        return 'bg-dark';
    }
  }

  obtenerBadgeParcialidad(estado?: string): string {
    switch (estado) {
      case 'PENDIENTE_RECEPCION':
        return 'bg-warning text-dark';

      case 'RECIBIDA':
        return 'bg-info';

      case 'RECHAZADA':
        return 'bg-danger';

      case 'PESAJE_REALIZADO':
        return 'bg-primary';

      default:
        return 'bg-secondary';
    }
  }

  obtenerMensajeError(err: any, mensajeDefault: string): string {
    return err?.error?.mensaje ||
           err?.error?.error ||
           err?.message ||
           mensajeDefault;
  }
}