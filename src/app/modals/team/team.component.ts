import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  private team: any;
  private developers: any;
  private maintainers: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<TeamComponent>) {
  }

  ngOnInit(): void {
  }

  receiveDevelopers($event) {
    this.developers = $event;
    console.log(this.developers);
  }

  reciveMaintainers($event) {
    this.maintainers = $event;
    console.log(this.maintainers);
  }

  modalClose() {
    this.dialogRef.close('close');
  }

  modalSave() {
    let dev = this.developers.map(map => map.id);
    const mai = this.maintainers.map(map => map.id);
    dev = dev.filter(val => {
      return !mai.includes(val);
    });

    this.dialogRef.close('success');
  }
}
