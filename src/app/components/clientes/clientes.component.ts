import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Cliente } from '../../models/cliente.models';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  public title: string;
  public cliente: Cliente;
  public clientes: Cliente[];

  public cliente$: Observable<Cliente>;

  constructor(
    private _clientesService: ClientesService
  ) {
    this.title = 'Formulario de Clientes'
    this.cliente = new Cliente();
    this.clientes = [];
  }

  ngOnInit(): void {
    this.cliente$ = this._clientesService.getCliente$();
    this.cliente$.subscribe(param => this.cliente = param);
  }

  onSubmit(form: any) {
    this._clientesService.grabarCliente(this.cliente);
    this.cliente = new Cliente();
    form.reset();
  }

}
