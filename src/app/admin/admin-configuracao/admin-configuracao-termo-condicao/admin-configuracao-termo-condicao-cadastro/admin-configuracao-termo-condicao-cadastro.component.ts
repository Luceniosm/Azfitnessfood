import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastrService } from 'ngx-toastr';
import { TermoCondicao } from '../admin-configuracao-termo-condicao-model/admin-configuracao-termo-condicao.model';
import { AdminConfiguracaoTermoCondicaoService } from '../admin-configuracao-termo-condicao.service';

@Component({
  selector: 'app-admin-configuracao-termo-condicao-cadastro',
  templateUrl: './admin-configuracao-termo-condicao-cadastro.component.html',
  styleUrls: ['./admin-configuracao-termo-condicao-cadastro.component.css']
})
export class AdminConfiguracaoTermoCondicaoCadastroComponent implements OnInit {
  @Input() termoCondicao: TermoCondicao;
  @Output() visualizarTermoEmit = new EventEmitter();
  public editor = ClassicEditor;

  constructor(
    private termoCondicaoService: AdminConfiguracaoTermoCondicaoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  salvar(): void {
    this.termoCondicaoService.salvarTermoECondicao(this.termoCondicao).subscribe((result) => {
      if (result.success) {
        this.toastr.success('Termo salvo com sucesso!');
        this.visualizarTermoEmit.emit();
      } else {
        this.toastr.error('Erro ao salvar o termo!');
      }
    });
  }
  voltar(): void {
    this.visualizarTermoEmit.emit();
  }

  ehValido(): boolean {
    if (this.termoCondicao.descricao && this.termoCondicao.titulo) {
      return true;
    }
    return false;
  }
}
