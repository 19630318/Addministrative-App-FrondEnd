import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject } from '@angular/core';


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  private dialogRef = inject(DialogRef);
  title: string = this.data.title;
  titleButton: string = this.data.titleButton;
  message: string = this.data.message;

  constructor(@Inject(DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  close(deleteData: boolean) {
    if (deleteData) {
      this.dialogRef.close({  message: "delete", status: true});
    }
    this.dialogRef.close({  message: "any", status: false});
  }

}
