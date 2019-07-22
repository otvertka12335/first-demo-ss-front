import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Project} from '../../models/project.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class CreateProjectComponent implements OnInit {

  @Input() project: Project;

  myForm: FormGroup;

  constructor(private fb: FormBuilder,
              private activeModal: NgbActiveModal,
              private userService: UserService) {
  }

  ngOnInit() {
    this.project.userId = this.userService.getPgUserFromStorage();
    this.myForm = this.fb.group({
      name: [this.project.name, Validators.required],
      description: [this.project.description, Validators.required],
      userId: [this.project.userId.id, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      this.activeModal.close({
        id: this.project.id,
        name: this.myForm.getRawValue().name,
        description: this.myForm.getRawValue().description,
        userId: this.myForm.getRawValue().userId,
      });
    }
  }

}
