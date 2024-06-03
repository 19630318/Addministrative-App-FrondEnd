import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { ButtonComponent } from './../../../shared/components/button/button.component';
import { RequestStatus } from '../../../models/request-status.models';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from './../../../util/validators';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../../services/auth.service';
import { UserCreateDto } from '../../../models/user.models';
import { BossCreateDto } from '../../../models/boss.model';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ButtonComponent, FontAwesomeModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {

  //Tenemos que inyectar los servicios que vamos a utilizar en el componente para poder utilizarlos
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  //Creamos el formulario con los campos que necesitamos para eso utilizamos el formBuilder que nos 
  //provee angular para crear formularios reactivos.
  form = this.formBuilder.nonNullable.group({ //El nonNullable es para que no nos de error de que el form es null y group es para crear un grupo de campos
    name: ['', [Validators.required]],//Los validators son para validar que el campo no este vacio pero tambien se puede validar que sea un email o que tenga una longitud minima
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
    confirmPassword: ['', [Validators.required]],
  }, {
    //El segundo parametro del formBuilder es para validar que dos campos sean iguales en este caso password y confirmPassword
    validators: [ CustomValidators.MatchValidator('password', 'confirmPassword') ]
  });
  //El status es para saber en que estado se encuentra el formulario ya sea cargando, exitoso o fallido
  status: RequestStatus = 'init';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showPassword = false;
  message: string = '';
  showRegisterUser = false;
  messageError = '';
  error = false;
  success = false;

  //El metodo register() es para registrar un usuario
  register(){
    //Validamos que el formulario sea valido
    if (this.form.valid) {
      //Cambiamos el estado del formulario a cargando
      this.status = 'loading';
      //Obtenemos los valores del formulario
      const { name, email, lastName, phone, password } = this.form.getRawValue(); 
      //Creamos un objeto de tipo UserCreateDto con los valores del formulario 
      const newUser: BossCreateDto = {
        name: name,
        lastname: lastName,
        email: email,
        password: password,
        phone: phone
      }; 
      //Llamamos al metodo register del servicio de autenticacion y le pasamos el objeto newUser
      this.authService.register(
        newUser
      ).subscribe({ //Nos suscribimos al observable que nos devuelve el metodo register
        next: () => { //Si el observable nos devuelve un valor llamamos al metodo next que es para saber que el observable nos devolvio un valor
          this.status = 'success';
          this.success = true;
          this.router.navigate(['/app']);//Redirigimos al usuario a la pagina de login
        },
        error: (error) => { // Si el observable nos devuelve un error llamamos al metodo error que es para saber que el observable nos devolvio un error
          this.status = 'failed';
          this.error = true;
          if (this.messageError.length === 0) {
            this.messageError = 'Error inesperado, intente mas tarde.';
          }else{
            this.messageError = error.error.error;
          }
          console.log(error);
        }
      });
      }
    }

}
