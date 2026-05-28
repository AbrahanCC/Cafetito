export interface LoginRequest {
  nombre: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
  rol: Rol | number | string;
  usuario: string;
  nitAgricultor?: string;
  idAgricultor?: number;
  estado?: number;
}

export interface Cuenta {
  idCuenta?: number;
  nitAgricultor?: number | string | Agricultor;
  pesoObjetivo?: number;
  pesoAcumulado?: number;
  pesoBasculaTotal?: number;
  saldoPendiente?: number;
  cantidadParcialidades?: number;
  fechaEnvio?: string;
  fechaLlegada?: string;
  estado?: string;
  diferenciaTotal?: number;
  tolerancia?: number;
  resultadoTolerancia?: string;
}

export interface Parcialidad {
  idParcialidad?: number;
  idParcialidadBeneficio?: number;
  idParcialidadAgricultor?: number;
  idPesajeAgricultor?: number;
  cuenta?: Cuenta;
  idCuenta?: number | Cuenta;

  placaTransporte?: string;
  estadoTransporte?: number;
  observacionTransporte?: string;

  cuiTransportista?: string;
  nombreTransportista?: string;
  estadoTransportista?: number;
  observacionTransportista?: string;

  pesoEnviado?: number;
  pesoBascula?: number;
  diferenciaPeso?: number;
  tipoMedida?: string;

  estado?: string;
  detalle?: string;
  observaciones?: string;

  fechaRecepcionParcialidad?: string;
  fechaPesoBascula?: string;
  boleta?: boolean;
  fechaBoleta?: string;
}

export interface ActualizarPesoBasculaRequest {
  pesoBascula: number;
  tipoMedida: string;
  observaciones?: string;
}

export enum Rol {
  BENEFICIO = 'ROLE_BENEFICIO',
  PESOCABAL = 'ROLE_PESOCABAL',
  AGRICULTOR = 'ROLE_AGRICULTOR'
}

export interface Agricultor {
  idAgricultor?: number;
  nit?: string;
  nitAgricultor?: string;
  nombre: string;
  direccion?: string;
  telefono?: string;
  activo?: boolean;
  observaciones?: string;
  fecha?: string;
  fechaCreacion?: string;
}

export interface Marca {
  idCatalogo: number;
  nombre: string;
  idCatalogoPublico?: number;
}

export interface Color {
  idCatalogo: number;
  nombre: string;
  idCatalogoPublico?: number;
}

export interface Linea {
  idCatalogo: number;
  nombre: string;
  idCatalogoPublico?: number;
}

export interface Modelo {
  idCatalogo: number;
  nombre: string;
  idCatalogoPublico?: number;
}

export interface Licencia {
  idCatalogo: number;
  nombre: string;
  idCatalogoPublico?: number;
}

export interface DetalleCatalogo {
  idDetalleCatalogo: number;
  codigo?: string;
  valor?: string;
  factorConversion?: number;
  orden?: number;
}

export interface Transporte {
  idTransporte?: number;
  agricultor?: Agricultor;
  nitAgricultor?: string | Agricultor;
  placa?: string;
  marca?: Marca;
  color?: Color;
  linea?: Linea;
  modelo?: Modelo;
  estado?: number;
  activo?: boolean;
  disponible?: boolean;
  pesajeAsociado?: number;
  observaciones?: string;
  fechaCreacion?: string;
}

export interface CrearTransporteRequest {
  placa: string;
  marca: Marca;
  color: Color;
  linea: Linea;
  modelo: Modelo;
  observaciones?: string;
}

export interface ActualizarEstadoTransporteRequest {
  idTransporte: string;
  activo: boolean;
  observaciones: string;
}

export interface Transportista {
  idTransportista?: number;
  agricultor?: Agricultor;
  nitAgricultor?: string | Agricultor;
  nombre?: string;
  cui?: string;
  tipoLicencia?: Licencia;
  fechaNacimiento?: string;
  fechaVenciLicencia?: string;
  fechaVencimientoLicencia?: string;
  estado?: number;
  activo?: boolean;
  disponible?: boolean;
  pesajeAsociado?: number;
  observaciones?: string;
  fechaCreacion?: string;
}

export interface CrearTransportistaRequest {
  cui: string;
  nombre: string;
  fechaNacimiento: string;
  tipoLicencia: Licencia;
  fechaVenciLicencia: string;
}

export interface ActualizarEstadoTransportistaRequest {
  idTransportista: number;
  activo: boolean;
  observaciones: string;
}

export interface Pesaje {
  idPesaje?: number;
  idCuenta?: number;
  noCuenta?: string;
  agricultor?: Agricultor;
  estado?: DetalleCatalogo;
  medida?: DetalleCatalogo;
  pesoTotalActual?: number;
  fecha?: string;
  observaciones?: string;
  cantidadParcialidades?: number;
}

export interface CrearPesajeRequest {
  medida: DetalleCatalogo;
  pesoTotalActual: number;
  observaciones?: string;
}

export enum EstadoCuenta {
  CUENTA_CREADA = 'Cuenta Creada',
  CUENTA_ABIERTA = 'Cuenta Abierta',
  PESAJE_INICIADO = 'Pesaje Iniciado',
  PESAJE_FINALIZADO = 'Pesaje Finalizado',
  CUENTA_CERRADA = 'Cuenta Cerrada',
  CUENTA_CONFIRMADA = 'Cuenta Confirmada'
}

export interface CambiarEstadoCuentaRequest {
  nuevoEstado: string;
  nuevoEstadoNumerico?: number;
  diferenciaTotal?: number;
  observaciones?: string;
}

export interface CrearParcialidadRequest {
  placa: string;
  idTransportista: number;
  pesoActual: number;
  observaciones?: string;
}

export interface ActualizarPesoParcialidadRequest {
  idParcialidad: number;
  pesoObtenido: number;
  medidaPeso: string;
  observaciones: string;
  fechaPeso: string;
}

export interface ApiResponse<T> {
  codigo: number;
  mensaje: string;
  datos?: T;
}