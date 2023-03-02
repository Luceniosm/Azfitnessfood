import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { AdminDashboardService } from '../admin-dashboard-service.';
import { Peso } from './admin-dashboard-peso-model/admin-dashboard-peso.model';

@Component({
  selector: 'app-admin-dashboard-peso',
  templateUrl: './admin-dashboard-peso.component.html',
  styleUrls: ['./admin-dashboard-peso.component.css']
})
export class AdminDashboardPesoComponent implements OnInit {
  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  pieChartData: number[] = [10];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [];
  date = new Date;
  pesos: Array<Peso>;
  constructor(
    private adminDashboardService: AdminDashboardService,
    private datepipe: DatePipe,
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.obterQuantitativoDePeso();
  }

  obterQuantitativoDePeso(): void {

    this.adminDashboardService.obterQuantitativoDePeso(
      this.datepipe.transform(this.date, 'yyyy-MM-dd')
    ).subscribe(_ => {
      if (_.success) {
        this.pesos = _.data;
        this.pieChartColors = [];
        this.pieChartData = [];
        const colors = [];

        this.pesos.forEach(el => {
          const color = this.generateRandomColorRgb();
          colors.push(color);
          el.color = color;
          this.pieChartData.push(el.peso);
        });
        this.pieChartColors = [
          {
            backgroundColor: colors
          },
        ];

      }
    });
  }
  downloadRelatorio(peso: number): void {
    this.adminDashboardService.ExportarClientesDePesoXls(
      this.datepipe.transform(this.date, 'yyyy-MM-dd'),
      peso
    ).subscribe(_ => {
      this.downloadFile(_);
    });
  }

  downloadFile(_: any): void {
    const newBlob = new Blob([_], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(newBlob);
      return;
    }
    const data = window.URL.createObjectURL(newBlob);

    const link = document.createElement('a');
    link.href = data;
    link.download = 'porcao_' + this.datepipe.transform(this.date, 'dd-MM-yyyy') + '.xls';
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }

  random_rgba(): string {
    const o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
  }

  generateRandomColorRgb() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return 'rgba(' + red + ',' + green + ',' + blue + ',1)';
  }


}
