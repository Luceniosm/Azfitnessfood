import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login-titulo',
  templateUrl: './login-titulo.component.html',
  styleUrls: ['./login-titulo.component.css']
})
export class LoginTituloComponent implements OnInit {
  @Input() titulo: string;
  @Input() favIcon: string;
  @Input() botaoVoltar: string;

  visualizar = true;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      if (params['visualizar'] !== undefined) {
        this.visualizar = params['visualizar'] === 'false' ? false : true;
      }
    });
  }

}
