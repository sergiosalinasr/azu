import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-tasks',
  templateUrl: './admin-tasks.component.html',
  styleUrls: ['./admin-tasks.component.css']
})
export class AdminTasksComponent {

  tareas = [
    { titulo: 'Salud', descripcion: 'Respuesta de salud del sistema', endpoint: '/mpd/listen' },
    { titulo: 'seedTDUCDU', descripcion: 'Carga tablas TDU y CDU', endpoint: '/seedTDUCDU' },
    { titulo: 'deleteTDUCDU', descripcion: 'Borrar tablas TDU y CDU', endpoint: '/deleteTDUCDU' }
  ];

  constructor(private http: HttpClient) {}

  ejecutarTarea(endpoint: string) {
    const confirmar = confirm(`¿Estás seguro de que deseas ejecutar la tarea "${endpoint}"?`);
    if (!confirmar) {
      return;
    }

    this.http.get(`http://localhost:3000${endpoint}`)
      .subscribe({
        next: (response) => {
          console.log(`Respuesta de ${endpoint}:`, response);
          alert(`¡${endpoint} ejecutada correctamente!`);
        },
        error: (error) => {
          console.error(`Error en ${endpoint}:`, error);
          alert(`Error ejecutando ${endpoint}`);
        }
      });
  }
}

