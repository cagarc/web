import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdenpagoService {
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

  ingresarOrdenPago(ordenPago: any) {
    let ruta = 'http://localhost:7080/api/es/ingresoPago';
    console.log('crear: ' + ruta);
    return this.httpEntidad
      .post<any>(ruta, ordenPago)
      .pipe(catchError(this.handleError));
  }
}
