import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BeneficioService } from '../../../core/services/beneficio';
import { Agricultor } from '../../../core/models/models';

@Component({
  standalone: false,
  selector: 'app-agricultores',
  templateUrl: './agricultores.html',
  styleUrls: ['./agricultores.css']
})
export class AgricultoresComponent implements OnInit {

  agricultores: Agricultor[] = [];
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

    this.beneficioService.listarAgricultores().subscribe({
      next: data => {
        this.agricultores = data || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: err => {
        this.agricultores = [];
        this.loading = false;
        this.error =
          err?.error?.mensaje ||
          err?.error?.error ||
          'No se pudieron cargar los agricultores.';
        this.cdr.detectChanges();
      }
    });
  }
}