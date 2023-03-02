import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { AdminDashboardService } from '../admin-dashboard-service.';
import { FaturamentoAnual } from './admin-dashboard-faturamento.model/admin-dashboard-faturamento-anual.model';
import { Faturamento } from './admin-dashboard-faturamento.model/admin-dashboard-faturamento.model';

@Component({
  selector: 'app-admin-dashboard-faturamento',
  templateUrl: './admin-dashboard-faturamento.component.html',
  styleUrls: ['./admin-dashboard-faturamento.component.css']
})
export class AdminDashboardFaturamentoComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          callback: function (value, index, values) {
            return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
          }
        }
      }]
    }
  };
  barChartLabels: Label[] = ['JAN', 'FEB', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  dataAtual = new Date();
  barChartData: ChartDataSets[] = [];
  faturamento: Faturamento;

  constructor(
    private adminDashboardService: AdminDashboardService,
    private datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.obterFaturamento();
  }

  obterFaturamento(): void {
    this.faturamento = null;
    this.barChartData = [];
    this.adminDashboardService.obterFaturamento()
      .subscribe(_ => {
        if (_.success) {
          this.faturamento = _.data;
          this.barChartData.push(
            {
              label: (this.dataAtual.getFullYear() - 1).toString(),
              data: this.obterFaturamentoAnoAtual(this.faturamento.faturamentosAnoAnterior)
            },
            {
              label: (this.dataAtual.getFullYear()).toString(),
              data: this.obterFaturamentoAnoAtual(this.faturamento.faturamentosAnoAtual)
            },
          );
        }
      });
  }
  obterFaturamentoAnoAtual(faturamentos: FaturamentoAnual[]): any[] {
    const data = [];
    for (let index = 0; index < 12; index++) {
      const mes = faturamentos.find(el => el.mes === index + 1);
      if (mes) {
        data.push(mes.valor);
      } else {
        data.push(0);
      }
    }
    return data;
  }

  downloadFaturamento(): void {
    this.adminDashboardService.exportarPagamentosAbertoXls().subscribe(_ => {
      const newBlob = new Blob([_], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      const data = window.URL.createObjectURL(newBlob);

      const link = document.createElement('a');
      link.href = data;
      link.download = 'Faturamento_' + this.datepipe.transform(new Date, 'dd-MM-yyyy') + '.xls';
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(function () {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }

}
