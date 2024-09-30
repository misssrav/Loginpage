import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers:[AuthService, ApiService,UserStoreService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public users:any=[];
  public fullName:string = "";
  constructor(private auth:AuthService, private api:ApiService, private userStore: UserStoreService){};
  logOut(){
    this.auth.signOut();
  }
  ngOnInit(){
    this.api.getUsers()
    .subscribe(res=>{
      this.users=res;
    });

    this.userStore.getFullNameFromStore()
    .subscribe(res =>{
      let fullNameFromToken = this.auth.getfullNameFromToken();
      this.fullName= res || fullNameFromToken
    })
  }
}
