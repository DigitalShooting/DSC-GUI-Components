import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Session, Config, Discipline, ConfigDisciplineGroup } from "../../classes/session";
import { DscAPI_Token, DscAPIInterface } from "../../api";

@Component({
  selector: 'app-disciplin',
  templateUrl: './disciplin.component.html',
  styleUrls: ['./disciplin.component.scss'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ height: 0, opacity: 0 }),
            animate('200ms', style({ height: '*', opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ height: '*', opacity: 1 }),
            animate('200ms', style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class DisciplinComponent implements OnInit {

  // Enable user edit (change part, change disciplin, actions, ...)
  @Input() enableEdit: boolean = false;

  @Input() config: Config;
  @Input() disziplin: Discipline;
  // @Input() disciplines: Discipline[];
  
  selectedGroup: ConfigDisciplineGroup;
  selectGroup(group: ConfigDisciplineGroup) {
    this.selectedGroup = group;
  }
  
  updateSelectedGroup() {
    if (this.disziplin != null && this.config != null && this._openMenu == false) {
      // Search for the current selected group
      this.selectedGroup = this.config.disziplinen.groups.find(group => {
        return group.disziplinen.find(d => d == this.disziplin._id) != null;
      });
    }
  }
  
  
  
  private menuTitle = "disciplin";
  @Output() openMenuChange = new EventEmitter();
  _openMenu = false;
  @Input() set openMenu(event) {
    if ((event.menuTitle != this.menuTitle && event.state == true) || event.triggerClose == true) {
      this._openMenu = false;
    }
  }
  toggleMenu() {
    if (this.enableEdit) {
      this._openMenu = !this._openMenu;
      this.openMenuChange.emit({
        state: this._openMenu,
        menuTitle: this.menuTitle,
        triggerClose: false,
      });
      // Update selected in case of change during open menu
      this.updateSelectedGroup();
    }
  }
  
  ngOnChanges() {
    this.updateSelectedGroup()
  }
  
  setDiscipline(disciplin: string) {
    console.log("setdisciplin", disciplin)
    this.dscAPI.setDisciplin(disciplin);
  }

  constructor(@Inject(DscAPI_Token) public dscAPI: DscAPIInterface) { }

  ngOnInit() {
  }

}
