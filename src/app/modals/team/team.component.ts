import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  private team: any;
  private developers: any;
  private maintainers: any;
  selectedTab = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<TeamComponent>) {
  }

  ngOnInit(): void {
  }

  openContentOne() {
      this.selectedTab = this.selectedTab - 1;
  }
  receiveDevelopers($event) {
    this.developers = $event;
  }

  receiveMaintainers($event) {
    this.maintainers = $event;
  }

  modalClose() {
    this.dialogRef.close({status: false});
  }

  modalSave() {
    let dev = this.developers.map(map => map.id);
    const mai = this.maintainers.map(map => map.id);
    dev = dev.filter(val => {
      return !mai.includes(val);
    });

    this.dialogRef.close({id: this.data.id, mai, dev, status: true});
  }
}
