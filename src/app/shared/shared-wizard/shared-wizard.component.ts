import { Component, OnInit, Input } from '@angular/core';
import { Steps } from './shared-wizard-steps.model';

@Component({
  selector: 'app-shared-wizard',
  templateUrl: './shared-wizard.component.html',
  styleUrls: ['./shared-wizard.component.css']
})
export class SharedWizardComponent implements OnInit {
  @Input() steps: Array<Steps>;

  constructor() { }

  ngOnInit() {
  }

}
