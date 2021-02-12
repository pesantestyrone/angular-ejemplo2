
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Cliente } from '../models/cliente.models';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private cliente$ = new Subject<Cliente>();
  private clientes: Cliente[] = [];
  private clientes$ = new Subject<Cliente[]>();

  private modo: number = 0;

  constructor() {
  }

  getCliente$(): Observable<Cliente> {
    return this.cliente$.asObservable();
  }

  getClientes$(): Observable<Cliente[]> {
    return this.clientes$.asObservable();
  }


  cargar() {
    this.clientes$.next(this.clientes);
  }

  grabarCliente(cliente: Cliente) {
    if (this.modo == 0) {
      this.agregarCliente(cliente);
    } else {
      this.editarCliente(cliente);
    }
  }

  agregarCliente(cliente: Cliente) {
    cliente.id = this.clientes.length + 1;
    this.clientes.push({ ...cliente });
    this.clientes$.next(this.clientes);
  }

  seleccionarCliente(cliente: Cliente) {
    this.modo = 1;
    this.cliente$.next({ ...cliente });
  }

  editarCliente(cliente: Cliente) {
    var id: number = { ...cliente }.id;

    this.clientes.findIndex((value, i) => {
      if (value.id === id) {
        this.clientes[i].nombre = cliente.nombre;
        this.clientes[i].apellidos = cliente.apellidos;
        this.clientes[i].ciudad = cliente.ciudad;
        this.clientes$.next(this.clientes);
        this.modo = 0;
      }
    });
  }

  borrarCliente(cliente: Cliente) {
    const i: number = this.clientes.indexOf(cliente);
    if (i >= 0) {
      this.clientes.splice(i, 1);
      this.clientes$.next(this.clientes);
    }
  }

}
