import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthService
} from '../services/auth.service';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  email: string;
  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit() {}
  doResetPassword() {
    this.authService.resetPassword(this.email).then(() => {
      alert('Revisa tu correo y sigue las indicaciones para recuperar tu contraseña');
      this.router.navigate(['/login']);
    }).catch((error) => console.log(error));
  }

}
