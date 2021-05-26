import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OrdenpagoService } from './../../../Service/Entidad/OrdenPago/ordenpago.service';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

import { Articulo } from '../../../model/articulo';
import { ClienteService } from './../../../Service/Entidad/cliente/cliente.service';

@Component({
  selector: 'app-orden',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class OrdenComponent implements OnInit {
  submitted = false;
  expandedElement: any;
  modeloArticulo: Articulo[] = [];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor(
    private clienteServicio: ClienteService,
    private ordenPagoServicio: OrdenpagoService
  ) {}
  fromArticulo = new FormGroup({
    precioUnitario: new FormControl('', Validators.required),
    codigoArticulo: new FormControl('', Validators.required),
    nombreArticulo: new FormControl('', Validators.required),
  });

  fromCliente = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Apellido: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.cargarDatos();
  }

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: any;

  displayedColumns = ['Nombre Articulo', 'Codigo Articulo', 'Precio Articulo'];
  //expandedElement: Articulo | null;

  ingresoArticulo() {
    console.log('wwwww');
    this.submitted = true;
  }
  onSubmit() {
    console.log('wwwerr');
  }

  ngAfterContentInit() {
    this.cargarDatos();
  }

  agregarArticulo() {
    this.submitted = false;
    var articulo = this.fromArticulo.value;
    this.fromArticulo.reset();
    articulo.codigoCLiente = this.fromCliente.controls.identificacion;
    console.log(articulo);
    this.modeloArticulo.push(articulo);
  }

  cargarDatos() {
    console.log(this.modeloArticulo);
    this.dataSource.data = this.modeloArticulo;
  }

  cerrarPopUp() {}

  numericOnly(event: any): boolean {
    // restrict e,+,-,E characters in  input type number
    debugger;
    const charCode = event.which ? event.which : event.keyCode;
    if (
      charCode == 101 ||
      charCode == 69 ||
      charCode == 45 ||
      charCode == 43 ||
      charCode == 44
    ) {
      return false;
    }
    return true;
  }

  procesar() {
    this.clienteServicio.ingresoCliente(this.fromCliente.value).subscribe(
      (result) => {
        console.log(result);

        this.dataSource.data = this.modeloArticulo;
        console.log(this.dataSource.data);
      },
      (error) => {
        console.log(error);
      }
    );
    this.fromCliente.reset();
    this.ordenPagoServicio.ingresarOrdenPago(this.modeloArticulo).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
