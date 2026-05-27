import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BeneficioService } from '../../../core/services/beneficio';
import { Transportista } from '../../../core/models/models';

@Component({
  standalone: false,
  selector: 'app-transportistas-beneficio',
  templateUrl: './transportistas.html',
  styleUrls: ['./transportistas.css']
})
export class TransportistasBeneficioComponent implements OnInit {

  transportistas: Transportista[] = [];
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

    this.beneficioService.listarTransportistas().subscribe({
      next: data => {
        this.transportistas = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.transportistas = [];
        this.loading = false;
        this.error = err?.error?.mensaje || err?.error?.error || 'No se pudieron cargar los transportistas.';
        this.cdr.detectChanges();
      }
    });
  }

  obtenerEstado(estado?: number): string {
    return estado === 1 ? 'Activo' : 'Inactivo';
  }

  obtenerDisponible(disponible?: boolean): string {
    return disponible ? 'Sí' : 'No';
  }
}