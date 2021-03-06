import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string;
  password: string;
  name: string;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
  }
  doRegister()
  {
    this.authService.register(this.email, this.password,this.name).then( () =>{
      this.router.navigate(['/home']);
    }).catch(err => {
      alert('No se pudo crear el usuario ');
    })
  }

}
