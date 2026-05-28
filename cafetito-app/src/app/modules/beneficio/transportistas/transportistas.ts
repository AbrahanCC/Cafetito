import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { BeneficioService } from '../../../core/services/beneficio';
import { Cuenta, Parcialidad } from '../../../core/models/models';

@Component({
  standalone: false,
  selector: 'app-transportistas-beneficio',
  templateUrl: './transportistas.html',
  styleUrls: ['./transportistas.css']
})
export class TransportistasBeneficioComponent implements OnInit {

  transportistas: Parcialidad[] = [];

  loading = false;
  error = '';

  constructor(
    private beneficioService: BeneficioService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;
    this.error = '';

    this.beneficioService.listarCuentas().pipe(
      switchMap((cuentas: Cuenta[]) => {
        if (!cuentas || cuentas.length === 0) {
          return of([]);
        }

        const peticiones = cuentas
          .filter(c => !!c.idCuenta)
          .map(c =>
            this.beneficioService.listarParcialidadesPorCuenta(c.idCuenta!).pipe(
              catchError(() => of([]))
            )
          );

        if (peticiones.length === 0) {
          return of([]);
        }

        return forkJoin(peticiones).pipe(
          map(resultados => resultados.flat())
        );
      })
    ).subscribe({
      next: data => {
        this.transportistas = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.transportistas = [];
        this.loading = false;
        this.error = this.obtenerMensajeError(err, 'No se pudieron cargar los transportistas.');
        this.cdr.detectChanges();
      }
    });
  }

  obtenerEstado(estado?: number): string {
    if (estado === 1) {
      return 'Activo';
    }

    if (estado === 0) {
      return 'Inactivo';
    }

    return 'Sin estado';
  }

  obtenerBadgeEstado(estado?: number): string {
    if (estado === 1) {
      return 'bg-success';
    }

    if (estado === 0) {
      return 'bg-secondary';
    }

    return 'bg-dark';
  }

  obtenerCuenta(t: any): string {
    return t?.cuenta?.idCuenta || '-';
  }

  obtenerPesaje(t: any): string {
    return t?.idPesajeAgricultor || '-';
  }

  obtenerFecha(t: any): any {
    return t?.fechaRecepcionParcialidad || null;
  }

  obtenerMensajeError(err: any, mensajeDefault: string): string {
    return err?.error?.mensaje ||
           err?.error?.error ||
           err?.message ||
           mensajeDefault;
  }
}