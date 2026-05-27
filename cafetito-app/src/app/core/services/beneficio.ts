import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  private readonly API_CUENTAS = 'http://localhost:8090/api/cuentas';
  private readonly API_PARCIALIDADES = 'http://localhost:8090/api/parcialidades';
  private readonly API_TRANSITOS = 'http://localhost:8090/api/transitos';
  private readonly API_AGRICULTORES = 'http://localhost:8090/api/agricultor';

  constructor(private http: HttpClient) {}

  listarCuentas(): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(this.API_CUENTAS);
  }

  listarCuentasPesoCabal(): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(`${this.API_CUENTAS}/peso-cabal`);
  }

  listarCuentasCerradas(): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(`${this.API_CUENTAS}/cerradas`);
  }

  listarCuentasConfirmadas(): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(`${this.API_CUENTAS}/confirmadas`);
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

  listarParcialidadesPorCuenta(idCuenta: number): Observable<Parcialidad[]> {
    return this.http.get<Parcialidad[]>(
      `${this.API_PARCIALIDADES}/cuenta/${idCuenta}`
    );
  }

  listarTransportes(): Observable<Transporte[]> {
    return this.http.get<Transporte[]>(this.API_TRANSITOS);
  }

  listarTransportistas(): Observable<Transportista[]> {
    return this.http.get<Transportista[]>(this.API_TRANSITOS);
  }

  listarAgricultores(): Observable<Agricultor[]> {
    return this.http.get<Agricultor[]>(this.API_AGRICULTORES);
  }
}