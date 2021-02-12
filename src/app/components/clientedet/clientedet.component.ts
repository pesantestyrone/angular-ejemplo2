import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Cliente } from '../../models/cliente.models';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-clientedet',
  templateUrl: './clientedet.component.html',
  styleUrls: ['./clientedet.component.css']
})
export class ClientedetComponent implements OnInit {
  public clientes: Cliente[] = [];
  public clientes$: Observable<Cliente[]>;

  constructor(private _clientesService: ClientesService) { }

  ngOnInit(): void {
    this.clientes$ = this._clientesService.getClientes$();
    this.clientes$.subscribe(param => this.clientes = param);
    this._clientesService.cargar();
  }

  eliminar(i: number) {
    this._clientesService.borrarCliente(this.clientes[i]);
  }

  seleccionar(i: number) {
    this._clientesService.seleccionarCliente(this.clientes[i]);
  }

}
