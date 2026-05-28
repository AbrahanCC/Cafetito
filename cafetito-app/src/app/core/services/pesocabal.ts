import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Cuenta,
  Parcialidad,
  ActualizarPesoBasculaRequest
} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PesocabalService {

  private readonly API_CUENTAS = 'http://localhost:8090/api/cuentas';
  private readonly API_PESO_CABAL = 'http://localhost:8090/api/peso-cabal';

  constructor(private http: HttpClient) {}

  listarCuentas(): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(`${this.API_CUENTAS}/peso-cabal`);
  }

  listarPendientes(): Observable<Parcialidad[]> {
    return this.http.get<Parcialidad[]>(
      `${this.API_PESO_CABAL}/parcialidades/pendientes`
    );
  }

  listarPesadas(): Observable<Parcialidad[]> {
    return this.http.get<Parcialidad[]>(
      `${this.API_PESO_CABAL}/parcialidades/pesadas`
    );
  }

  listarBoletas(): Observable<Parcialidad[]> {
    return this.http.get<Parcialidad[]>(
      `${this.API_PESO_CABAL}/parcialidades/boletas`
    );
  }

  actualizarPeso(
    idParcialidad: number,
    request: ActualizarPesoBasculaRequest
  ): Observable<Parcialidad> {
    return this.http.put<Parcialidad>(
      `${this.API_PESO_CABAL}/parcialidades/${idParcialidad}/peso`,
      request
    );
  }

  generarBoleta(idParcialidad: number): Observable<Parcialidad> {
    return this.http.put<Parcialidad>(
      `${this.API_PESO_CABAL}/parcialidades/${idParcialidad}/boleta`,
      {}
    );
  }
}