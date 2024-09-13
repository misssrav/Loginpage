import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder){}
  ngOnInit():void{
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }
  hideShowPass(){
    this.isText= !this.isText;
    this.isText? this.eyeIcon= 'fa-eye': this.eyeIcon= "fa-eye-slash";
    this.isText? this.type= "text": this.type="password"

  }
  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
    }
    else{

      this.validateAllFormFields(this.loginForm);
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
