import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../../shared/components/button/button.component';
import { BossesService } from '../../../../../services/bosses.service';
import { Observable } from 'rxjs';
import { CategorieBusines } from '../../../../../models/ResponseCategoriesBussiness.models';
import { RequestStatus } from '../../../../../models/request-status.models';
import { Boss, BossCreateDto } from '../../../../../models/boss.model';

@Component({
  selector: 'app-jefes-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './jefes-dialog.component.html',
  styleUrl: './jefes-dialog.component.css'
})
export class JefesDialogComponent {

  private bossServices = inject(BossesService)
  private dialogRef = inject(DialogRef);
  private formBuilder = inject(FormBuilder);

  form: any | undefined

  status: RequestStatus = 'init';
  error = '';

  ngOnInit() {

    this.initializeForm();

  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      phone: ['', Validators.required ]
    });
  }

  close(){
    this.dialogRef.close({ message: "close", status: false });
  }

  createBoses(){
    this.status = 'loading';
    if (this.form.valid) {
      const { name, lastname, email, password, phone } = this.form.getRawValue();
      const newBoss: BossCreateDto = {
        name: name,
        lastname: lastname,
        email: email,
        password: password,
        phone: phone
      };
      this.bossServices.createUser(newBoss).subscribe(
        {
          next: () => {
            this.status = 'success';
            this.dialogRef.close({  message: "create", status: true});
          },
          error: (error) => {
            this.status = 'failed';
            this.error = error.error.message;
          }
        }
      );
    }else {
      this.form.markAllAsTouched();
      this.status = 'init';
    }	
  }

}
