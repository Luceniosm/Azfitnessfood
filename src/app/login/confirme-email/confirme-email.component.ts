import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-confirme-email',
  templateUrl: './confirme-email.component.html',
  styleUrls: ['./confirme-email.component.css']
})
export class ConfirmeEmailComponent implements OnInit {
  email: string;
  hideForm = true;

  constructor(private route: ActivatedRoute, private loginService: LoginService) {
    this.route.queryParams
      .subscribe(params => {
        this.validarEmail(params['email']);
      });
  }

  ngOnInit() {
  }

  validarEmail(email) {
    this.loginService.loginValidarEmail(email)
      .subscribe((result) => {
        if (result.data) {
          this.hideForm = false;
        }
      });
  }

}
