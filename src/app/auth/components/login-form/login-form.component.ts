import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { faPen, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth.service';
import { RequestStatus } from '../../../models/request-status.models';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

  private formBuilder = inject(FormBuilder);
  private authServices = inject(AuthService);
  private router = inject(Router);

  form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [ Validators.required, Validators.minLength(6)]],
  });
  faPen = faPen;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  status: RequestStatus = 'init';
  messageError = '';
  error = false;
  success = false;

  doLogin() {
    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      this.authServices.login(email, password)
      .subscribe(
        {
          next: (boss)=>{
            this.status = 'success';
            this.success = true;
            this.router.navigate(['/app']);
          },
          error: (error)=>{
            this.status = 'failed';
            this.error = true;
            if (!error.error.error) {
              this.messageError = 'Error inesperado, intente mas tarde.';
            }else{
              this.messageError = error.error.error;
            }
            console.log(error.error.error);
          }
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

}
