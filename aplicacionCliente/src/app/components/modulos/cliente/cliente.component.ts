import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ErrorStateMatcher } from '@angular/material/core';
import { Cliente } from '../../../model/cliente';

import { ClienteService } from '../../../Service/Entidad/cliente/cliente.service';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})

/** Error when invalid control is dirty, touched, or submitted. */
export class ClienteComponent implements OnInit {
  constructor(private clienteService: ClienteService) {}

  Icliente: Cliente[] = [];

  myForm = new FormGroup({
    identificacion: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    //sexo: new FormControl(''),
    genero: new FormControl(''),
    edad: new FormControl(''),
    fecNacimiento: new FormControl(''),
    email: new FormControl('', Validators.required),
    direccion: new FormControl(''),
    celular: new FormControl(''),
  });
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: any;

  displayedColumns = [
    'identificacion',
    'celular',
    'direccion',
    'email',
    'edad',
    'fecNacimiento',
    'nombre',
    'apellido',
    'genero',
    'actions',
  ];

  ngOnInit(): void {}

  onSubmit() {
    this.clienteService.ingresoCliente(this.myForm.value).subscribe(
      (result) => {
        console.log(result);
        this.myForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
    this.Icliente.push(this.myForm.value);
    this.dataSource.data = this.Icliente;
  }

  eliminarCliente(cliente: any) {
    console.log(cliente);
    this.clienteService.eliminarCliente(cliente.identificacion).subscribe((result)=> {
      console.log(result);
    });

   // this.dataSource.data = this.clienteService.;

  }
  selected = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);

  //expandedElement: Articulo | null;
}
