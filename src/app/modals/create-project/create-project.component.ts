import {Component, Inject, Input, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class CreateProjectComponent implements OnInit {

  @Input() project: any;

  myForm: FormGroup;

  constructor(private fb: FormBuilder,
              // private activeModal: NgbActiveModal,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<CreateProjectComponent>
  ) {
  }

  ngOnInit() {
    // this.project.userId = this.userService.getPgUserFromStorage();
    this.myForm = this.fb.group({
      name: [this.project.name,
        Validators.compose([
          Validators.required,
          Validators.maxLength(25),
          Validators.minLength(3)
        ])],
      description: [this.project.description,
        Validators.required],
      userId: [this.project.userId,
        Validators.required]
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      this.dialogRef.close({
        result: true,
        id: this.project.id,
        name: this.myForm.getRawValue().name,
        description: this.myForm.getRawValue().description,
        userId: this.myForm.getRawValue().userId,
      });
    }
  }

  onNoClick() {
    this.dialogRef.close({
      result: false
    });
  }

}
