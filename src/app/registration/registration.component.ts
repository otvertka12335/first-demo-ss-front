import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {CheckingUniqueness} from '../validators/CheckingUniqueness';

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
  }

  // Building form group
  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      addressGroup: this.formBuilder.group({
        address: ['', Validators.required],
        addressCheckbox: true
      }),
      hobbies: this.formBuilder.array([]),
      phoneNumbers: this.formBuilder.array([])
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

  // Return hobbies form array for better access
  get hobbiesGroup(): FormArray {
    return this.registrationForm.get('hobbies') as FormArray;
  }

  // Return phone numbers form array for better access
  get phoneNumbersGroup(): FormArray {
    return this.registrationForm.get('phoneNumbers') as FormArray;
  }

  // Return address group for better access
  get addressGroup(): AbstractControl {
    return this.registrationForm.get('addressGroup');
  }

  // Event on add one more hobby
  addHobby(): void {
    this.hobbiesGroup.push(this.newHobby());
  }

  // Event on add one more phone number
  addPhoneNumber(): void {
    this.phoneNumbersGroup.push(this.newPhoneNumber());
  }

  // Return form group for new hobby
  newHobby(): FormGroup {
    return this.formBuilder.group({
      hobbyName: ['', Validators.compose([
        Validators.required, CheckingUniqueness(this.hobbiesGroup, 'hobbyName')
      ])]
    });
  }

  // Return form group for new phoneNumber
  newPhoneNumber(): FormGroup {
    return this.formBuilder.group({
      phoneNumber: ['', Validators.compose([
        Validators.required, CheckingUniqueness(this.phoneNumbersGroup, 'phoneNumber')
      ])]
    });
  }

  // Creating new user and saving him in db
  createUser(): void {
    const name = this.registrationForm.get('name').value;
    const username = this.registrationForm.get('username').value;
    const password = this.registrationForm.get('password').value;
    const address = this.addressGroup.get('address').value;
    const hobbies = [];
    for (let i = 0; i < this.phoneNumbersGroup.length; i++) {
      hobbies.push(this.hobbiesGroup.at(i).get('hobbyName').value);
    }
    const phoneNumbers = [];
    for (let i = 0; i < this.phoneNumbersGroup.length; i++) {
      phoneNumbers.push(this.phoneNumbersGroup.at(i).get('phoneNumber').value);
    }
    const newUser: User = {name, username, password, address, hobbies, phoneNumbers} as User;
    this.userService.addUser(newUser)
      .subscribe(async () => {
        localStorage.setItem('isAuth', 'true');
        await this.router.navigate(['dashboard']);
      });
  }
}
