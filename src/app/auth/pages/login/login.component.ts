import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './../../components/login-form/login-form.component';
import { BackgroundComponent } from './../../components/background/background.component';
import { HeaderComponent } from './../../components/header/header.component';
import { FooterComponent } from './../../components/footer/footer.component';
import { TokenService } from '../../../services/token.service';
import { sign } from 'crypto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, BackgroundComponent, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  private tokenService = inject(TokenService);
  private route = inject(ActivatedRoute);

  token = false;
  error = true;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log('Token:', this.token);
      // Haz lo que necesites con el ID recibido
    });
  }


}
