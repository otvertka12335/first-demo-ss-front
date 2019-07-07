import {Component, OnInit} from '@angular/core';
import {AbstractControl, Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
    this.registrationForm = formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      addressGroup: formBuilder.group({
        address: ['', Validators.required],
        addressCheckbox: true
      }),
      hobbies: formBuilder.array([
        this.newHobby()
      ]),
      phoneNumbers: formBuilder.array([
        this.newPhoneNumber()
      ])
    });

    this.addressGroup.get('addressCheckbox').valueChanges
      .subscribe((value: boolean) => {
        if (value) {
          this.addressGroup.get('address').setValidators(Validators.required);
        } else {
          this.addressGroup.get('address').clearValidators();
        }
        this.addressGroup.get('address').updateValueAndValidity();
      });
  }

  get hobbies(): FormArray {
    return this.registrationForm.get('hobbies') as FormArray;
  }

  get phoneNumbers(): FormArray {
    return this.registrationForm.get('phoneNumbers') as FormArray;
  }

  get addressGroup(): AbstractControl {
    return this.registrationForm.get('addressGroup');
  }

  addHobby(): void {
    this.hobbies.push(this.newHobby());
  }

  addPhoneNumber(): void {
    this.phoneNumbers.push(this.newPhoneNumber());
  }

  newHobby(): FormGroup {
    return this.formBuilder.group({
      hobbyName: ['', Validators.required]
    });
  }

  newPhoneNumber(): FormGroup {
    return this.formBuilder.group({
      phoneNumber: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  createUser(): void {
    const name = this.registrationForm.get('name').value;
    const username = this.registrationForm.get('username').value;
    const password = this.registrationForm.get('password').value;
    const address = this.addressGroup.get('address').value;
    const hobbies = [];
    const phoneNumbers = [];
    for (let i = 0; i < this.hobbies.length; i++) {
      hobbies.push(this.hobbies.at(i).get('hobbyName').value);
    }
    for (let i = 0; i < this.phoneNumbers.length; i++) {
      phoneNumbers.push(this.phoneNumbers.at(i).get('phoneNumber').value);
    }
    const newUser: User = {name, username, password, address, hobbies, phoneNumbers} as User;
    this.userService.addUser(newUser)
      .subscribe(async () => {
        localStorage.setItem('isAuth', 'true');
        await this.router.navigate(['dashboard']);
      });
  }

}
