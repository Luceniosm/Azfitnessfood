import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

import { monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { AdminDashboardService } from '../admin-dashboard-service.';
import { EDieta } from './admin-dashboard-dieta-model/admin-dashboard-dieta.enum';
import { Dieta } from './admin-dashboard-dieta-model/admin-dashboard-dieta.model';

@Component({
  selector: 'app-admin-dashboard-dieta',
  templateUrl: './admin-dashboard-dieta.component.html',
  styleUrls: ['./admin-dashboard-dieta.component.css']
})
export class AdminDashboardDietaComponent implements OnInit {
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
  pieChartData: number[] = [10, 10, 10];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartColors = [
    {
      backgroundColor: ['rgba(255,193,7,1)', 'rgba(0,123,255,1)', 'rgba(220,53,69,1)'],
    },
  ];
  dieta: Dieta;
  date = new Date;
  EnumDieta = EDieta;
  constructor(
    private adminDashboardService: AdminDashboardService,
    private datepipe: DatePipe,
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.obterQuantitativoDeDietas();
  }

  obterQuantitativoDeDietas(): void {
    this.pieChartData = [];
    this.adminDashboardService.obterQuantitativoDeDietas(
      this.datepipe.transform(this.date, 'yyyy-MM-dd')
    ).subscribe(_ => {
      if (_.success) {
        this.dieta = _.data;
        this.pieChartData.push(this.dieta.saladas250);
        this.pieChartData.push(this.dieta.saladas500);
        this.pieChartData.push(this.dieta.lowCarb);
      }
    });

  }

  downloadClientesRelatorio(tipo: EDieta): void {
    this.adminDashboardService.exportarClientesDeDietaXls(
      this.datepipe.transform(this.date, 'yyyy-MM-dd'),
      tipo
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
    link.download = 'Dieta_' + this.datepipe.transform(this.date, 'dd-MM-yyyy') + '.xls';
    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

    setTimeout(function () {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }
}

