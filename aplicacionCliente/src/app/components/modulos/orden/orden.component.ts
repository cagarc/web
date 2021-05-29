import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OrdenpagoService } from './../../../Service/Entidad/OrdenPago/ordenpago.service';
import { ArticuloService } from '../../../Service/Entidad/articulo/articulo.service';
import { Cliente } from '../../../model/cliente';
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

  nombreArticulo: any;
  selectedCar: any;

  listaArticulo: any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor(
    private clienteServicio: ClienteService,
    private ordenPagoServicio: OrdenpagoService,
    private articulo: ArticuloService
  ) {}
  fromArticulo = new FormGroup({
    unidadArticulo: new FormControl('', Validators.required),
    codigoArticulo: new FormControl('', Validators.required),
    nombreArticulo: new FormControl('', Validators.required),
    fechaRegistro:new FormControl('', Validators.required),
  });

  fromCliente = new FormGroup({
    identificacion: new FormControl('', Validators.required),
    Nombre: new FormControl('', Validators.required),
    Apellido: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.cargarDatos();
    this.articulo.consultaArticulo().subscribe(
      (resul) => {
        console.log('Exito');
        this.listaArticulo = resul;
        console.log(this.listaArticulo);
      },
      (error) => {
        console.log('Error');
      }
    );
  }

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort: any;

  displayedColumns = ['Nombre Articulo', 'Codigo Articulo', 'Precio Articulo','unidad Articulo'];
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
    var articulo = this.fromArticulo.value;
    console.log(articulo.nombreArticulo);
    let producto = articulo.nombreArticulo;

    // valida si que existe articulo disponible
    if (articulo.nombreArticulo.stop > articulo.unidadArticulo) {
      this.fromArticulo.reset();
      producto.stop = articulo.nombreArticulo.stop - articulo.unidadArticulo;
      console.log(producto);
      articulo.codigoCLiente = this.fromCliente.value.identificacion;
      articulo.precio = articulo.nombreArticulo.precio;
      articulo.codigoArticulo = articulo.nombreArticulo.id;
      articulo.nombreArticulo = articulo.nombreArticulo.nombre;
      articulo.fechaRegistro =this.fromCliente.value.fecha
      this.submitted = false;
      console.log(articulo);
      this.modeloArticulo.push(articulo);
      this.cargarDatos();


      // DEscontar el producto que se compro
      let arrr: [] = this.listaArticulo;
      let product:any;
      arrr.forEach(function (elemento, indice, array) {

        product = array[indice];
        console.log(product);
        if (producto.id == articulo.nombreArticulo.id) {
          array[indice] == producto;
          console.log(array.indexOf(array[indice]));
        }
      });
    } else {
      alert('No existe en stok');
    }
  }
//recarga los datos
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
    let clie: Cliente = {
      identificacion: this.fromCliente.value.identificacion,
      celular: '',
      genero: '',
      direccion: '',
      edad: 0,
      email: '',
      fechaNacimiento: new Date(),
      nombre: this.fromCliente.value.Nombre,
      apellido: this.fromCliente.value.Apellido,
    };


    //Ingresa el cliente
    this.clienteServicio.ingresoCliente(clie).subscribe(
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

    // ingresa la orden de pago
    this.ordenPagoServicio.ingresarOrdenPago(this.modeloArticulo).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );

    //actualiza el stock
    this.articulo.actualizaArticulo(this.listaArticulo).subscribe((resul)=>{
      console.log(resul)
    });
    this.dataSource.data =[];
    this.submitted= false;
  }

}
