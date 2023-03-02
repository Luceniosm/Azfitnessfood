import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})


export class CalendarioComponent implements OnInit {
  firstWeekDay = 'Monday';
  selectedDay = moment().format('YYYY-MM-DD');
  funcaoPersonalizada = null;
  funcaoNext = null;
  funcaoPrev = null;
  currentSelected = null;
  selectedEvents = [];

  constructor() {
  }

  ngOnInit() {

    $(document).ready(function () {
      moment.locale('pt-br');
      console.log(moment().daysInMonth());
    });
  }

  construirCalendario(selectedDay = '', firstWeekDay = '') {
    this.firstWeekDay = firstWeekDay;
    this.selectedDay = selectedDay === '' ? moment().format('YYYY-MM-DD') : selectedDay;

  }
}
