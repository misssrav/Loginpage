import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule, HttpClientModule],
  providers: [AuthService,HttpClient],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}
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
  onsignup(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value)
      this.auth.signUp(this.signupForm.value)
      .subscribe({
        next:(res=>{
          alert(res.message);
          this.signupForm.reset();
          this.router.navigate(['login'])
        }),
        error:(err=>{
          alert(err?.err.messsage)
        })

      })
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
