import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackgroundComponent } from './../../components/background/background.component';
import { FooterComponent } from './../../components/footer/footer.component';
import { HeaderComponent } from './../../components/header/header.component';
import { RegisterFormComponent } from './../../components/register-form/register-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [BackgroundComponent, FooterComponent, HeaderComponent, RouterModule, RegisterFormComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

}
