import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../logout/logout.component.scss']
})
export class RegisterComponent implements OnInit {
  userid!: string | null;
  constructor(private router:Router,private auth:Auth) { }

  ngOnInit(): void {

    this.stateUserLogin();
    
  }

  register(){
    this.router.navigate(['/register']);
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
