import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private authService: AuthService
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

  acceder() {
    if (this.form.invalid) return;

    this.cargando = true;

    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.cargando = false;
        this.authService.redirectByRol();
      },
      error: () => {
        this.errorMsg = 'Usuario o contraseña incorrectos';
        this.cargando = false;
      }
    });
  }
}