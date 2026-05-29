import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, Rol } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API =
    `${environment.apiGatewayUrl}${environment.endpoints.auth}`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.API}/login`, credentials)
      .pipe(
        tap(response => {
          sessionStorage.clear();

          sessionStorage.setItem('cafetito_user', JSON.stringify(response));
          sessionStorage.setItem('cafetito_token', response.token);
          sessionStorage.setItem('cafetito_rol', String(response.rol));
          sessionStorage.setItem('cafetito_idAgricultor', String(response.idAgricultor ?? ''));
        })
      );
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  get currentUser(): LoginResponse | null {
    const data = sessionStorage.getItem('cafetito_user');
    return data ? JSON.parse(data) : null;
  }

  get token(): string | null {
    return sessionStorage.getItem('cafetito_token');
  }

  get rol(): Rol | null {
    const rawRol = sessionStorage.getItem('cafetito_rol') || this.currentUser?.rol;

    if (rawRol === null || rawRol === undefined) {
      return null;
    }

    const rolNormalizado = String(rawRol).trim().toUpperCase();

    if (rolNormalizado === '1' || rolNormalizado === 'BENEFICIO') {
      return Rol.BENEFICIO;
    }

    if (rolNormalizado === '2' || rolNormalizado === 'PESOCABAL' || rolNormalizado === 'PESO_CABAL') {
      return Rol.PESOCABAL;
    }

    if (rolNormalizado === '3' || rolNormalizado === 'AGRICULTOR') {
      return Rol.AGRICULTOR;
    }

    return null;
  }

  redirectByRol(): void {
    switch (this.rol) {
      case Rol.AGRICULTOR:
        this.router.navigate(['/agricultor']);
        break;

      case Rol.BENEFICIO:
        this.router.navigate(['/beneficio']);
        break;

      case Rol.PESOCABAL:
        this.router.navigate(['/pesocabal']);
        break;

      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}