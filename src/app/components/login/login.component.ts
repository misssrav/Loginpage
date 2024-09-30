import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule,HttpClientModule],
  providers: [AuthService,UserStoreService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth:AuthService, private router:Router, private userStore:UserStoreService){}
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
  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value)
      .subscribe({
        next: (res=>{
          alert(res.message);
          this.loginForm.reset();
          this.auth.storeToken(res.token);
          const tokenPayload = this.auth.decodeToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          
          this.router.navigate(['dashboard'])
        }),
        error:(err=>{
          alert(err?.err.message)
        })
      })
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
