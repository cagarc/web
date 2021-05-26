import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  URLconfig = environment.URLLogin;
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

  inicioSesion(usuario: string, contrasena: string): Observable<any> {
    const ruta = this.URLconfig + '/' + usuario + '/' + contrasena;
    console.log('ruta: ' + ruta);
    return this.httpEntidad.get(ruta).pipe(catchError(this.handleError));
  }
}
