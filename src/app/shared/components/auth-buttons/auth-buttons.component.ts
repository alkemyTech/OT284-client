import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-buttons',
  templateUrl: './auth-buttons.component.html',
  styleUrls: ['./auth-buttons.component.scss']
})
export class AuthButtonsComponent implements OnInit {
  userid!: string | null;
  @Output() actualizacionUsuario: EventEmitter<any> = new EventEmitter<any>();
  constructor(private router:Router,private auth: Auth,private authService: AuthService) { }

  ngOnInit(): void {
    this.stateUserLogin();
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout(){
    
    this.authService.logoutFirebase()
    .then( () => {

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Has cerrado sesión.',
        showConfirmButton: false,
        timer: 1500
      }).finally(() => {
        localStorage.removeItem('uid');
        localStorage.removeItem('UserData');
        this.router.navigate(['/login']);
        this.actualizacionUsuario.emit();
      })
    })
    .catch( error => console.error(`error: ${error}`));
  }

  register(){
    this.router.navigate(['/register']);
  }

  stateUserLogin(){
    onAuthStateChanged(this.auth, (user) => {
      this.actualizacionUsuario.emit();
      if(user){
       this.userid= user?.uid;
      }
      else{
        this.userid = null;
      }
    });
  }

}
