import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  form: FormGroup;
  errorMsg = '';
  cargando = false;
  mostrarPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  get nombre() {
    return this.form.get('nombre')!;
  }

  get contrasena() {
    return this.form.get('contrasena')!;
  }

  acceder(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMsg = '';
    this.cargando = true;

    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.cargando = false;

        const redirect = sessionStorage.getItem('redirect_after_login');

        if (redirect) {
          sessionStorage.removeItem('redirect_after_login');
          this.router.navigateByUrl(redirect);
          return;
        }

        this.authService.redirectByRol();
      },
      error: () => {
        this.errorMsg = 'Usuario o contraseña incorrectos';
        this.cargando = false;
      }
    });
  }
}