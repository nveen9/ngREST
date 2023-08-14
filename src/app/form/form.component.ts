import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../service/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  userForm: FormGroup;

  category: string[] = [ 'FOOD', 'OTHER' ];

  constructor(private _formB: FormBuilder, private userService: UserService, private _dialogR: MatDialogRef<FormComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
    this.userForm = this._formB.group({
      title: '',
      category: '',
      description: '',
      date: new Date(),
      amount: 100
    })
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  formData(){
    if(this.userForm.valid){
      if(this.data){
        this.userService.updateData(this.data.id, this.userForm.value).then(response => {
          console.log(response.data);
          alert('Updated');
          this._dialogR.close(true);
        }).catch(error => {
          console.log(error);
        })
      }else{
        this.userService.postData(this.userForm.value).then(response => {
          console.log(response.data);
          alert('Added successfully');
          this._dialogR.close(true);
        }).catch(error => {
          console.log(error);
        })
      }      
    }
  }
}
