import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userid!: string | null;
  constructor(private router:Router,private auth: Auth) { }

  ngOnInit(): void {
  
    this.stateUserLogin();
  }

  login(){
    this.router.navigate(['/login']);
  }

  stateUserLogin(){
    onAuthStateChanged(this.auth, (user) => {
      if(user){
       this.userid= user?.uid;
       console.log(this.userid);
      }
      else{
        this.userid = null;
      }
    });
  }
}
