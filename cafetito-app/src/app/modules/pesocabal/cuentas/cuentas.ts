import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Cuenta, Parcialidad } from '../../../core/models/models';
import { PesocabalService } from '../../../core/services/pesocabal';

type VistaPesoCabal = 'CUENTAS' | 'PENDIENTES' | 'PESADAS' | 'BOLETAS';

@Component({
  standalone: false,
  selector: 'app-cuentas-pesocabal',
  templateUrl: './cuentas.html',
  styleUrls: ['./cuentas.css']
})
export class CuentasPesoCabalComponent implements OnInit {

  vista: VistaPesoCabal = 'CUENTAS';

  cuentas: Cuenta[] = [];
  parcialidades: Parcialidad[] = [];

  loading = false;
  procesando = false;

  error = '';
  mensaje = '';

  parcialidadSeleccionada: Parcialidad | null = null;

  pesoForm: FormGroup;

  constructor(
    private pesocabalService: PesocabalService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.pesoForm = this.fb.group({
      pesoBascula: ['', [Validators.required, Validators.min(0.01)]],
      tipoMedida: ['Kilogramo', Validators.required],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const vista = params['vista'] as VistaPesoCabal;

      if (
        vista === 'CUENTAS' ||
        vista === 'PENDIENTES' ||
        vista === 'PESADAS' ||
        vista === 'BOLETAS'
      ) {
        this.cambiarVista(vista);
      } else {
        this.cambiarVista('CUENTAS');
      }
    });
  }

  cambiarVista(vista: VistaPesoCabal): void {
    if (this.procesando) {
      return;
    }

    this.vista = vista;
    this.error = '';
    this.mensaje = '';
    this.parcialidadSeleccionada = null;

    this.cuentas = [];
    this.parcialidades = [];

    this.pesoForm.reset({
      pesoBascula: '',
      tipoMedida: 'Kilogramo',
      observaciones: ''
    });

    if (vista === 'CUENTAS') {
      this.cargarCuentas();
    }

    if (vista === 'PENDIENTES') {
      this.cargarPendientes();
    }

    if (vista === 'PESADAS') {
      this.cargarPesadas();
    }

    if (vista === 'BOLETAS') {
      this.cargarBoletas();
    }
  }

  cargarCuentas(): void {
    this.loading = true;
    this.error = '';

    this.pesocabalService.listarCuentas().subscribe({
      next: data => {
        this.cuentas = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.cuentas = [];
        this.loading = false;
        this.error = this.obtenerMensajeError(err, 'No se pudieron cargar las cuentas.');
        this.cdr.detectChanges();
      }
    });
  }

  cargarPendientes(): void {
    this.loading = true;
    this.error = '';

    this.pesocabalService.listarPendientes().subscribe({
      next: data => {
        this.parcialidades = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.parcialidades = [];
        this.loading = false;
        this.error = this.obtenerMensajeError(err, 'No se pudieron cargar las parcialidades pendientes.');
        this.cdr.detectChanges();
      }
    });
  }

  cargarPesadas(): void {
    this.loading = true;
    this.error = '';

    this.pesocabalService.listarPesadas().subscribe({
      next: data => {
        this.parcialidades = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.parcialidades = [];
        this.loading = false;
        this.error = this.obtenerMensajeError(err, 'No se pudieron cargar las parcialidades pesadas.');
        this.cdr.detectChanges();
      }
    });
  }

  cargarBoletas(): void {
    this.loading = true;
    this.error = '';

    this.pesocabalService.listarBoletas().subscribe({
      next: data => {
        this.parcialidades = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.parcialidades = [];
        this.loading = false;
        this.error = this.obtenerMensajeError(err, 'No se pudieron cargar las boletas.');
        this.cdr.detectChanges();
      }
    });
  }

  seleccionarParcialidad(parcialidad: Parcialidad): void {
    this.error = '';
    this.mensaje = '';
    this.parcialidadSeleccionada = parcialidad;

    this.pesoForm.reset({
      pesoBascula: parcialidad.pesoEnviado || '',
      tipoMedida: parcialidad.tipoMedida || 'Kilogramo',
      observaciones: 'Peso registrado por Peso Cabal'
    });
  }

  actualizarPeso(): void {
    if (this.procesando) {
      return;
    }

    if (this.pesoForm.invalid) {
      this.pesoForm.markAllAsTouched();
      return;
    }

    const idParcialidad = this.obtenerIdParcialidad(this.parcialidadSeleccionada);

    if (!idParcialidad) {
      this.error = 'No se encontró la parcialidad seleccionada.';
      return;
    }

    this.error = '';
    this.mensaje = '';
    this.procesando = true;

    const request = {
      pesoBascula: Number(this.pesoForm.value.pesoBascula),
      tipoMedida: this.pesoForm.value.tipoMedida,
      observaciones: this.pesoForm.value.observaciones || ''
    };

    this.pesocabalService.actualizarPeso(idParcialidad, request).subscribe({
      next: () => {
        this.procesando = false;
        this.mensaje = 'Peso báscula registrado correctamente.';
        this.cancelar();
        this.cargarPendientes();
      },
      error: err => {
        this.procesando = false;
        this.error = this.obtenerMensajeError(err, 'No se pudo registrar el peso báscula.');
        this.cdr.detectChanges();
      }
    });
  }

  generarBoleta(parcialidad: Parcialidad): void {
    if (this.procesando) {
      return;
    }

    const idParcialidad = this.obtenerIdParcialidad(parcialidad);

    if (!idParcialidad) {
      this.error = 'No se encontró la parcialidad para generar boleta.';
      return;
    }

    this.error = '';
    this.mensaje = '';
    this.procesando = true;

    this.pesocabalService.generarBoleta(idParcialidad).subscribe({
      next: () => {
        this.procesando = false;
        this.mensaje = 'Boleta generada correctamente.';
        this.cargarPesadas();
      },
      error: err => {
        this.procesando = false;
        this.error = this.obtenerMensajeError(err, 'No se pudo generar la boleta.');
        this.cdr.detectChanges();
      }
    });
  }

  cancelar(): void {
    if (this.procesando) {
      return;
    }

    this.parcialidadSeleccionada = null;
    this.pesoForm.reset({
      pesoBascula: '',
      tipoMedida: 'Kilogramo',
      observaciones: ''
    });
  }

  descargarBoleta(parcialidad: Parcialidad): void {
    const idParcialidad = this.obtenerIdParcialidad(parcialidad);
    const idCuenta = this.obtenerCuentaParcialidad(parcialidad);

    const contenido = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Boleta Parcialidad ${idParcialidad}</title>

  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      color: #222;
    }

    .header {
      text-align: center;
      border-bottom: 2px solid #198754;
      padding-bottom: 15px;
      margin-bottom: 25px;
    }

    .header h1 {
      margin: 0;
      color: #198754;
    }

    .section {
      margin-bottom: 20px;
    }

    .section h3 {
      background: #d1e7dd;
      padding: 8px;
      margin-bottom: 10px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    td,
    th {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }

    .footer {
      margin-top: 60px;
      display: flex;
      justify-content: space-between;
    }

    .firma {
      width: 40%;
      text-align: center;
      border-top: 1px solid #000;
      padding-top: 8px;
    }
  </style>
</head>

<body>

  <div class="header">
    <h1>Cafetito</h1>
    <h2>Boleta de Peso Cabal</h2>
  </div>

  <div class="section">
    <h3>Datos de la parcialidad</h3>

    <table>
      <tr>
        <th>No. Parcialidad</th>
        <td>${idParcialidad || '-'}</td>
      </tr>

      <tr>
        <th>No. Cuenta</th>
        <td>${idCuenta || '-'}</td>
      </tr>

      <tr>
        <th>Estado</th>
        <td>${parcialidad.estado || '-'}</td>
      </tr>

      <tr>
        <th>Detalle</th>
        <td>${parcialidad.detalle || '-'}</td>
      </tr>
    </table>
  </div>

  <div class="section">
    <h3>Transporte y transportista</h3>

    <table>
      <tr>
        <th>Placa</th>
        <td>${parcialidad.placaTransporte || '-'}</td>
      </tr>

      <tr>
        <th>Transportista</th>
        <td>${parcialidad.nombreTransportista || '-'}</td>
      </tr>

      <tr>
        <th>CUI</th>
        <td>${parcialidad.cuiTransportista || '-'}</td>
      </tr>
    </table>
  </div>

  <div class="section">
    <h3>Pesos</h3>

    <table>
      <tr>
        <th>Peso enviado</th>
        <td>${parcialidad.pesoEnviado || 0}</td>
      </tr>

      <tr>
        <th>Peso báscula</th>
        <td>${parcialidad.pesoBascula || 0}</td>
      </tr>

      <tr>
        <th>Diferencia</th>
        <td>${parcialidad.diferenciaPeso ?? 0}</td>
      </tr>

      <tr>
        <th>Tipo medida</th>
        <td>${parcialidad.tipoMedida || '-'}</td>
      </tr>

      <tr>
        <th>Fecha peso báscula</th>
        <td>${parcialidad.fechaPesoBascula || '-'}</td>
      </tr>

      <tr>
        <th>Fecha boleta</th>
        <td>${parcialidad.fechaBoleta || '-'}</td>
      </tr>
    </table>
  </div>

  <div class="footer">
    <div class="firma">
      Firma Peso Cabal
    </div>

    <div class="firma">
      Firma Beneficio
    </div>
  </div>

</body>
</html>
`;

    const blob = new Blob([contenido], {
      type: 'text/html;charset=utf-8'
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `boleta-parcialidad-${idParcialidad || 'sin-id'}.html`;
    link.click();

    window.URL.revokeObjectURL(url);
  }

  imprimirBoleta(parcialidad: Parcialidad): void {
    const idParcialidad = this.obtenerIdParcialidad(parcialidad);
    const idCuenta = this.obtenerCuentaParcialidad(parcialidad);

    const ventana = window.open('', '_blank');

    if (!ventana) {
      this.error = 'No se pudo abrir la ventana de impresión.';
      return;
    }

    ventana.document.write(`
<html>
  <head>
    <title>Boleta Parcialidad ${idParcialidad}</title>

    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 40px;
      }

      h1,
      h2 {
        text-align: center;
      }

      h1 {
        color: #198754;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      th,
      td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
      }

      .firmas {
        margin-top: 70px;
        display: flex;
        justify-content: space-between;
      }

      .firma {
        width: 40%;
        text-align: center;
        border-top: 1px solid #000;
        padding-top: 8px;
      }
    </style>
  </head>

  <body>

    <h1>Cafetito</h1>
    <h2>Boleta de Peso Cabal</h2>

    <table>
      <tr><th>No. Parcialidad</th><td>${idParcialidad || '-'}</td></tr>
      <tr><th>No. Cuenta</th><td>${idCuenta || '-'}</td></tr>
      <tr><th>Placa</th><td>${parcialidad.placaTransporte || '-'}</td></tr>
      <tr><th>Transportista</th><td>${parcialidad.nombreTransportista || '-'}</td></tr>
      <tr><th>CUI</th><td>${parcialidad.cuiTransportista || '-'}</td></tr>
      <tr><th>Peso enviado</th><td>${parcialidad.pesoEnviado || 0}</td></tr>
      <tr><th>Peso báscula</th><td>${parcialidad.pesoBascula || 0}</td></tr>
      <tr><th>Diferencia</th><td>${parcialidad.diferenciaPeso ?? 0}</td></tr>
      <tr><th>Estado</th><td>${parcialidad.estado || '-'}</td></tr>
      <tr><th>Detalle</th><td>${parcialidad.detalle || '-'}</td></tr>
      <tr><th>Fecha boleta</th><td>${parcialidad.fechaBoleta || '-'}</td></tr>
    </table>

    <div class="firmas">
      <div class="firma">Firma Peso Cabal</div>
      <div class="firma">Firma Beneficio</div>
    </div>

  </body>
</html>
    `);

    ventana.document.close();
    ventana.print();
  }

  obtenerIdParcialidad(p: Parcialidad | null): number | null {
    return p?.idParcialidadBeneficio || p?.idParcialidad || null;
  }

  obtenerCuentaParcialidad(p: Parcialidad): number | string {
    const idCuenta = p?.cuenta?.idCuenta;

    if (typeof idCuenta === 'number') {
      return idCuenta;
    }

    if (typeof p?.idCuenta === 'number') {
      return p.idCuenta;
    }

    return '-';
  }

  obtenerBadgeEstadoCuenta(estado?: string): string {
    switch (estado) {
      case 'CUENTA_CONFIRMADA':
        return 'bg-success';

      case 'PESAJE_FINALIZADO':
        return 'bg-warning text-dark';

      case 'PESAJE_INICIADO':
        return 'bg-info';

      case 'CUENTA_CERRADA':
        return 'bg-secondary';

      default:
        return 'bg-dark';
    }
  }

  obtenerBadgeEstadoParcialidad(estado?: string): string {
    switch (estado) {
      case 'RECIBIDA':
        return 'bg-info';

      case 'PESAJE_REALIZADO':
        return 'bg-success';

      case 'RECHAZADA':
        return 'bg-danger';

      default:
        return 'bg-secondary';
    }
  }

  puedeGenerarBoleta(p: Parcialidad): boolean {
    return p.estado === 'PESAJE_REALIZADO' && !p.boleta;
  }

  obtenerMensajeError(err: any, mensajeDefault: string): string {
    return err?.error?.mensaje ||
           err?.error?.error ||
           err?.message ||
           mensajeDefault;
  }
}