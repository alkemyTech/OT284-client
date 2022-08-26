import { Component, OnInit } from '@angular/core';
import { onAuthStateChanged, Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  userid!: string | null;

  constructor(private authService: AuthService,private router: Router,private auth:Auth) { }

  ngOnInit(): void {
    this.stateUserLogin();
  }

  logout(){
    
    this.authService.logoutFirebase()
    .then( () => {
      alert("Has cerrado sesion.");
      localStorage.setItem('loginStatus','false');
      this.router.navigate(['/login']);
    })
    .catch( error => console.error(`error: ${error}`));
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
