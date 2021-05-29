import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
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

  consultaArticulo() {
    let ruta = 'http://localhost:9091/api/es/consultaArticulo';
    console.log('consulta: ' + ruta);
    return this.httpEntidad.get<any>(ruta).pipe(catchError(this.handleError));
  }

  actualizaArticulo(articulo :any){
    let ruta = 'http://localhost:9091/api/es/consultaArticulo';
    console.log('consulta: ' + ruta);
    return this.httpEntidad.put<any>(ruta,articulo).pipe(catchError(this.handleError));
  }
}
