import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  DetalleCatalogo,
  Marca,
  Color,
  Linea,
  Modelo,
  Licencia
} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  private apiUrl = `${environment.apiGatewayUrl}${environment.endpoints.agricultor}/catalogos`;

  constructor(
    private http: HttpClient
  ) {}

  listarMedidas():
  Observable<DetalleCatalogo[]> {

    return this.http.get<
      DetalleCatalogo[]
    >(
      `${this.apiUrl}/medidas`
    );

  }

  listarEstadosPesaje():
  Observable<DetalleCatalogo[]> {

    return this.http.get<
      DetalleCatalogo[]
    >(
      `${this.apiUrl}/estados-pesaje`
    );

  }

  listarMarcas():
  Observable<Marca[]> {

    return this.http.get<
      Marca[]
    >(
      `${this.apiUrl}/marcas`
    );

  }

  listarColores():
  Observable<Color[]> {

    return this.http.get<
      Color[]
    >(
      `${this.apiUrl}/colores`
    );

  }

  listarLineas():
  Observable<Linea[]> {

    return this.http.get<
      Linea[]
    >(
      `${this.apiUrl}/lineas`
    );

  }

  listarModelos():
  Observable<Modelo[]> {

    return this.http.get<
      Modelo[]
    >(
      `${this.apiUrl}/modelos`
    );

  }

  listarLicencias():
  Observable<Licencia[]> {

    return this.http.get<
      Licencia[]
    >(
      `${this.apiUrl}/licencias`
    );

  }

}