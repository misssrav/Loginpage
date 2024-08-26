import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  hideShowPass(){
    this.isText= !this.isText;
    this.isText? this.eyeIcon= 'fa-eye': this.eyeIcon= "fa-eye-slash";
    this.isText? this.type= "text": this.type="password"

  }
}
