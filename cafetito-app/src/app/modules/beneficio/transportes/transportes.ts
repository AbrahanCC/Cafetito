import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BeneficioService } from '../../../core/services/beneficio';

@Component({
  standalone: false,
  selector: 'app-transportes-beneficio',
  templateUrl: './transportes.html',
  styleUrls: ['./transportes.css']
})
export class TransportesBeneficioComponent implements OnInit {

  transportes: any[] = [];
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
    this.cdr.detectChanges();

    this.beneficioService.listarTransportes().subscribe({
      next: data => {
        this.transportes = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.transportes = [];
        this.loading = false;
        this.error =
          err?.error?.mensaje ||
          err?.error?.error ||
          'No se pudieron cargar los transportes.';
        this.cdr.detectChanges();
      }
    });
  }

  obtenerEstado(estado?: number): string {
    return estado === 1 ? 'Activo' : 'Inactivo';
  }
}