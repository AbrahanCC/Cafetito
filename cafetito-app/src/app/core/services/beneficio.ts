import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import {
  Cuenta,
  Parcialidad,
  Transporte,
  Transportista,
  Agricultor,
  CambiarEstadoCuentaRequest
} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class BeneficioService {

  private readonly API_CUENTAS =
    `${environment.apiGatewayUrl}${environment.endpoints.cuentas}`;

  private readonly API_PARCIALIDADES =
    `${environment.apiGatewayUrl}${environment.endpoints.parcialidades}`;

  private readonly API_TRANSITOS =
    `${environment.apiGatewayUrl}${environment.endpoints.transitos}`;

  private readonly API_AGRICULTORES =
    `${environment.apiGatewayUrl}${environment.endpoints.agricultor}/agricultores`;

  constructor(private http: HttpClient) {}

  // =========================
  // CUENTAS
  // =========================

  listarCuentas(): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(this.API_CUENTAS);
  }

  obtenerCuenta(idCuenta: number): Observable<Cuenta> {
    return this.http.get<Cuenta>(`${this.API_CUENTAS}/${idCuenta}`);
  }

  crearCuenta(cuenta: Cuenta): Observable<Cuenta> {
    return this.http.post<Cuenta>(this.API_CUENTAS, cuenta);
  }

  cambiarEstadoCuenta(
    idCuenta: number,
    request: CambiarEstadoCuentaRequest
  ): Observable<Cuenta> {
    return this.http.put<Cuenta>(
      `${this.API_CUENTAS}/${idCuenta}/estado`,
      request
    );
  }

  listarCuentasPorAgricultor(idAgricultor: number): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(
      `${this.API_CUENTAS}/agricultor/${idAgricultor}`
    );
  }

  // =========================
  // PARCIALIDADES
  // =========================

  listarParcialidadesPorCuenta(idCuenta: number): Observable<Parcialidad[]> {
    return this.http.get<Parcialidad[]>(
      `${this.API_PARCIALIDADES}/cuenta/${idCuenta}`
    );
  }

  recibirParcialidad(idParcialidad: number): Observable<Parcialidad> {
    return this.http.put<Parcialidad>(
      `${this.API_PARCIALIDADES}/${idParcialidad}/recibir`,
      {}
    );
  }

  rechazarParcialidad(idParcialidad: number): Observable<Parcialidad> {
    return this.http.put<Parcialidad>(
      `${this.API_PARCIALIDADES}/${idParcialidad}/rechazar`,
      {}
    );
  }

  // =========================
  // TRANSPORTES / TRANSPORTISTAS EN BENEFICIO
  // =========================

  listarTransportes(): Observable<Transporte[]> {
    return this.http.get<Transporte[]>(this.API_TRANSITOS);
  }

  listarTransportistas(): Observable<Transportista[]> {
    return this.http.get<Transportista[]>(this.API_TRANSITOS);
  }

  // =========================
  // AGRICULTORES
  // =========================

  listarAgricultores(): Observable<Agricultor[]> {
    return this.http.get<Agricultor[]>(this.API_AGRICULTORES);
  }

  buscarAgricultoresPorNit(nit: string): Observable<Agricultor[]> {
    return this.http.get<Agricultor[]>(
      `${this.API_AGRICULTORES}?nit=${encodeURIComponent(nit)}`
    );
  }

  obtenerDetalleAgricultor(idAgricultor: number): Observable<any> {
    return this.http.get<any>(
      `${this.API_AGRICULTORES}/${idAgricultor}/detalle`
    );
  }
}