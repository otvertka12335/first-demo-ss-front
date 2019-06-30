import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class UserFormComponent implements OnInit {
  @Input() user: User;
  @Output() newUser: EventEmitter<User>;
  myForm: FormGroup;

  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder) {
    this.newUser = new EventEmitter();
  }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required]
    });
  }

  // Return new or edited user if form valid
  getUserBack(): boolean {
    if (this.myForm.valid) {
      this.activeModal.close({
        id: this.user.id,
        name: this.myForm.controls.name.value,
        username: this.myForm.controls.username.value,
        password: this.myForm.controls.password.value
      });
    }
    return false;
  }
}
