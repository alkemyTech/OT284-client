import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth, GoogleAuthProvider } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { getAuth, signInWithPopup } from '@firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private auth: Auth, private router:Router) { }

  registerGoogle() {
    const provider = new GoogleAuthProvider;
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const auth = getAuth();
    auth.languageCode = 'es';

    signInWithPopup(auth, provider)
      .then((result: any) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // Add the uid to localstorage and redirect to home
        localStorage.setItem('uid', user.uid);
        localStorage.setItem('UserData', JSON.stringify(user));
        this.router.navigate(['home']);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });


  }

  register(name: string, email: string, password: string): Observable<any> {
    const body = {
      name: name,
      email: email,
      password: password
    };
    return this.http.post("https://ongapi.alkemy.org/api/register", body, { headers: this.httpHeaders });
  }

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    };
    return this.http.post("https://ongapi.alkemy.org/api/login", body, { headers: this.httpHeaders });
  }

  registerFirebase(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginFirebase(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logoutFirebase() {
    return signOut(this.auth);
  }

}
