import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder){}
  ngOnInit():void{
    this.signupForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
      email:['',Validators.required],
      firstname:['',Validators.required],
      lastname:['',Validators.required]
    })
  }
  hideShowPass(){
    this.isText= !this.isText;
    this.isText? this.eyeIcon= 'fa-eye': this.eyeIcon= "fa-eye-slash";
    this.isText? this.type= "text": this.type="password"

  }
  onSubmit(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value)
    }
    else{

      this.validateAllFormFields(this.signupForm);
      alert("Your form is invalid")
    }
  }

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field =>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if (control instanceof FormGroup){
        this.validateAllFormFields(control)
      }

    })
  }
}
