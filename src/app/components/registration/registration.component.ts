import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  private showSpinner = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private toast: ToastrService,
              private router: Router) {
  }

  // Building form group
  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    }, {
      validator: this.checkPassword
    });
  }

  // Creating new user and saving him in db
  createUser(): void {
    this.showSpinner = true;
    const email = this.registrationForm.get('username').value;
    const password = this.registrationForm.get('password').value;
    const name = this.registrationForm.get('name').value;
    this.authService.register(email, name, password).subscribe(
      (res: any) => {
        this.showSpinner = false;
        this.toast.info('Check ur Email address', 'Registration Success');
        this.router.navigateByUrl('/');
      },
      err => {
        this.showSpinner = false;
        this.toast.error(err, 'Registration Error');
      }
    );
  }

  checkPassword(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }
}
