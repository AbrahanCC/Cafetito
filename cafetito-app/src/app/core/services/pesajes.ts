import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Pesaje } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class PesajesService {

  private readonly API_URL =
    `${environment.apiGatewayUrl}${environment.endpoints.agricultor}/pesajes`;

  private readonly API_CUENTAS =
    `${environment.apiGatewayUrl}${environment.endpoints.agricultor}/cuentas`;

  constructor(
    private http: HttpClient
  ) {}

  listar(): Observable<Pesaje[]> {
    return this.http.get<Pesaje[]>(this.API_URL);
  }

  listarCuentasDisponibles(): Observable<any[]> {
    return this.http.get<any[]>(this.API_CUENTAS);
  }

  crear(body: Pesaje): Observable<Pesaje> {
    return this.http.post<Pesaje>(this.API_URL, body);
  }

  finalizar(idPesaje: number): Observable<Pesaje> {
    return this.http.put<Pesaje>(
      `${this.API_URL}/${idPesaje}/finalizar`,
      {}
    );
  }
}