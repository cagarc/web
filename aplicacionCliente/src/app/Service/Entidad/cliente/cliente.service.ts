import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private httpEntidad: HttpClient) {}

  private handleError(error: HttpErrorResponse): any {
    let codigo;
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      codigo = {
        codigo: error.status,
        descripcion: error.error.descripcion,
      };
      console.log(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    console.log(codigo);
    return throwError(codigo);
  }

  ingresoCliente(cliente: any) {
    let ruta = 'http://localhost:7090/api/es/cliente';
    console.log('crear: ' + ruta);
    return this.httpEntidad
      .post<any>(ruta, cliente)
      .pipe(catchError(this.handleError));
  }

  eliminarCliente(identificacion: string) {
    let ruta = 'http://localhost:7090/api/es/cliente' + '/' + identificacion;
    console.log('eliminar: ' + ruta);
    return this.httpEntidad.delete(ruta).pipe(catchError(this.handleError));
  }

  consultaCliente() {
    let ruta = 'http://localhost:7090/api/es/cliente';
    console.log('consulta: ' + ruta);
    return this.httpEntidad.get<any>(ruta).pipe(catchError(this.handleError));
  }
}
