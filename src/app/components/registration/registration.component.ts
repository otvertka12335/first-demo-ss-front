import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

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
              private router: Router) {
  }

  // Building form group
  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  // Creating new user and saving him in db
  createUser(): void {
    this.showSpinner = true;
    const email = this.registrationForm.get('username').value;
    const password = this.registrationForm.get('password').value;
    const name = this.registrationForm.get('name').value;
    this.authService.register(email, password, name).then(
      res => {
      },
      err => {
        this.showSpinner = false;
      }
    );
  }
}
