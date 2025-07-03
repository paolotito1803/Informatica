import { Component, OnInit } from '@angular/core';
import { Routes, RoutesService } from 'src/app/services/routes.service';
@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  routes: Routes[] = [];
  // Per il form di creazione
  newRoute: Partial<Routes> = {
    departure: '',
    destination: '',
    layoverFuel: []
  };
  // Controllo di editing inline
  editing: { [key: string]: boolean } = {};
  editBuffer: { [key: string]: Partial<Routes> } = {};

  constructor(private svc: RoutesService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.svc.getRoutes().subscribe({
      next: data => this.routes = data,
      error: err => console.error('Caricamento failed', err)
    });
  }

  // CREATE
  add(): void {
    if (!this.newRoute.departure || !this.newRoute.destination) return;
    this.svc.addRoute(this.newRoute as Routes).subscribe({
      next: created => {
        this.routes.push(created);
        this.newRoute = { departure: '', destination: '', layoverFuel: [] };
      },
      error: err => console.error('Add failed', err)
    });
  }

  // DELETE
  remove(id: string): void {
    this.svc.deleteRoute(id).subscribe({
      next: () => this.routes = this.routes.filter(r => r._id !== id),
      error: err => console.error('Delete failed', err)
    });
  }

  // EDIT
  startEdit(r: Routes): void {
    this.editing[r._id] = true;
    // copia shallow per non toccare l’array originale
    this.editBuffer[r._id] = {
      departure: r.departure,
      destination: r.destination,
      layoverFuel: [...r.layoverFuel]
    };
  }

  saveEdit(id: string): void {
    const data = this.editBuffer[id] as Routes;
    this.svc.editRoute(id, data).subscribe({
      next: updated => {
        const idx = this.routes.findIndex(r => r._id === id);
        if (idx > -1) this.routes[idx] = updated;
        this.cancelEdit(id);
      },
      error: err => console.error('Edit failed', err)
    });
  }

  cancelEdit(id: string): void {
    delete this.editing[id];
    delete this.editBuffer[id];
  }

  // Utility per gestire layover come stringa CSV
  toCSV(arr: string[]): string {
    return arr.join(', ');
  }
}

