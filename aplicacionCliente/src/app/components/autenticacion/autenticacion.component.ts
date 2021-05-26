import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Usuario} from '../../model/usuario'

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.scss'],
})
export class AutenticacionComponent implements OnInit {
  langs: string[] = [];
  hide = true;

  constructor(private router:Router) {}

  usuario: any;
  contrasena: any;
  ngOnInit(): void {}
  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required),
  });

  onLogin(form: Usuario) {
    console.log('goa');
    this.router.navigate(['pantallaInicio']);
  }
}
