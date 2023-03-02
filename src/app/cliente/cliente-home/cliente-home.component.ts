import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html'
})
export class ClienteHomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    document.body.className = 'cliente';
  }

}
