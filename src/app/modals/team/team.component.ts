import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {MatSelect} from '@angular/material';
import {UserService} from '../../services/user.service';
import {takeUntil} from 'rxjs/operators';
import {TeamService} from '../../services/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit, AfterViewInit, OnDestroy {

  mates: any;
  allMates: any;

  selected: any;

  teamControl: FormControl = new FormControl();
  teamControlFilter: FormControl = new FormControl();

  filteredMatesMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  protected _onDestroy = new Subject<void>();

  @ViewChild('multiSelect') multiSelect: MatSelect;

  constructor(private userService: UserService,
              private teamService: TeamService) {
  }

  ngOnInit() {

    this.userService.getUsers().subscribe((res: any) => {
      this.mates = res.data;
      this.allMates = res.data;
    });

    this.teamControlFilter.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterMates();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  protected filterMates() {
    if (!this.mates) {
      return;
    }
    // get the search keyword
    let search = this.teamControlFilter.value;
    if (!search) {
      this.mates = this.allMates;
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredMatesMulti.next(
      this.mates = this.mates.filter(mate => mate.name.toLowerCase().indexOf(search) > -1)
    );
  }

  protected setInitialValue() {
    // this.filteredMatesMulti
    //   .subscribe(() => {
    //     // setting the compareWith property to a comparison function
    //     // triggers initializing the selection according to the initial value of
    //     // the form control (i.e. _initializeSelection())
    //     // this needs to be done after the filteredBanks are loaded initially
    //     // and after the mat-option elements are available
    //     this.multiSelect.compareWith = (a, b) => a && b && a.id === b.id;
    //   });
    this.teamService.getTeamOfProject(1).subscribe((res: any) => {
      this.selected = res.data;
      console.log(this.selected);
    });
  }

}
