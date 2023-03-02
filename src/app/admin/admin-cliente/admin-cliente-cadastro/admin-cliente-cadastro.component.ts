import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthModel } from 'src/app/models/authentication/auth.model';
import { UserModel } from 'src/app/models/authentication/user.model';
import { AdminClienteService } from '../admin-cliente.service';


@Component({
  selector: 'app-admin-cliente-cadastro',
  templateUrl: './admin-cliente-cadastro.component.html',
  styleUrls: ['./admin-cliente-cadastro.component.css']
})
export class AdminClienteCadastroComponent implements OnInit {
  edicao: boolean;
  usuarioLogado: UserModel;

  constructor(
    private formBuilder: FormBuilder,
    private adminCliente: AdminClienteService,
    private toastr: ToastrService,
    private router: Router,
    public rotaAtual: ActivatedRoute,
    private modalService: NgbModal,
    private datepipe: DatePipe,
  ) { }
  ngOnInit() {
    this.getUsuarioLogado();
  }


  getUsuarioLogado() {
    this.usuarioLogado = (JSON.parse(localStorage.getItem('currentUser')) as AuthModel).user;
  }

  voltar() {
    this.router.navigate(['admin/clientes']);
  }
}
