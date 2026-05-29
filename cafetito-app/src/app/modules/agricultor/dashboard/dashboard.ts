import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-dashboard-agricultor',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardAgricultorComponent {

  constructor(private router: Router) {}

  irPesajes(): void {
    this.router.navigate(['/agricultor/pesajes']);
  }

  irTransportes(): void {
    this.router.navigate(['/agricultor/transportes']);
  }

  irTransportistas(): void {
    this.router.navigate(['/agricultor/transportistas']);
  }
}