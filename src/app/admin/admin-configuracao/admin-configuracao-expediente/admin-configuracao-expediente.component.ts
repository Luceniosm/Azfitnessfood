import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';
import { DiaDaSemana } from './admin-configuracao-expediente-model/admin-configuracao-expediente-dia-da-semana.model';
import { Horario } from './admin-configuracao-expediente-model/admin-configuracao-expediente-horario.model';
import { ExpedienteService } from './admin-configuracao-expediente.service';

@Component({
  selector: 'app-admin-configuracao-expediente',
  templateUrl: './admin-configuracao-expediente.component.html',
  styleUrls: ['./admin-configuracao-expediente.component.css']
})
export class AdminConfiguracaoExpedienteComponent implements OnInit {

  diasDaSemana: Array<DiaDaSemana>;
  formHorario: FormGroup;
  formCadastro: FormGroup;

  constructor(
    private adminExpedienteService: ExpedienteService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  async ngOnInit() {
    this.formCadastro = this.formBuilder.group({
      horaInicio: ['', Validators.required],
      horaFim: ['', Validators.required],
      descricao: ['', Validators.required],
      idHorarioDaSemana: [Guid.createEmpty().toString()],
      diasDaSemana: []
    });

    this.formHorario = this.formBuilder.group({
      horarios: this.formBuilder.array([])
    });

    this.diasDaSemana = new Array<DiaDaSemana>();
    await this.carregarDados();

  }

  async carregarDados() {
    this.adminExpedienteService.carregarDiasDaSemana().subscribe(sub => {
      if (sub.success) {
        this.diasDaSemana = sub.data as Array<DiaDaSemana>;
      }
    });
    this.adminExpedienteService.carregarHorarioEDiaExpediente().subscribe(sub => {
      if (sub.success) {
        const data = sub.data as Array<Horario>;
        const form = this.formHorario.get('horarios') as FormArray;

        data.forEach(el => {
          form.push(
            new FormControl(
              new Horario(
                el.idHorarioDaSemana,
                el.descricao,
                el.horaInicio,
                el.horaFim,
                el.diasDaSemana
              )));
        });
      }
    });
  }

  adicionar() {
    const form = <FormArray>this.formHorario.get('horarios');
    const novo = this.formCadastro.value;
    if (!novo.diasDaSemana) {
      novo.diasDaSemana = this.diasDaSemana;
    }
    form.push(new FormControl(novo));
    this.formCadastro.reset();
  }

  editar(item: Horario, idx: number) {
    this.formCadastro.patchValue({
      horaInicio: item.horaInicio,
      horaFim: item.horaFim,
      descricao: item.descricao,
      idHorarioDaSemana: item.idHorarioDaSemana,
      diasDaSemana: item.diasDaSemana
    });
    this.excluir(idx);
  }

  excluir(idx: number) {
    const form = <FormArray>this.formHorario.get('horarios');
    form.removeAt(idx);
  }

  salvar() {
    const dados = this.formHorario.get('horarios').value;
    this.adminExpedienteService.salvarExpediente(dados).subscribe(sub => {
      if (sub.success) {
        this.toastr.success('Expediente salvo com sucesso!');
      } else {
        this.toastr.error('Erro ao salvar expediente, tente novamente!');
      }
    });
  }

  checado(item: any) {
    item.expediente = !item.expediente;
  }

}
