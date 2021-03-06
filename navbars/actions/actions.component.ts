import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { DisciplinePart, Session } from "../../classes/session";
import { DscAPI_Token, DscAPIInterface } from "../../api";

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
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
export class ActionsComponent implements OnInit {
  
  private menuTitle = "actions";
  @Output() openMenuChange = new EventEmitter();
  _openMenu = false;
  @Input() set openMenu(event) {
    if ((event.menuTitle != this.menuTitle && event.state == true) || event.triggerClose == true) {
      this._openMenu = false;
    }
  }
  toggleMenu() {
    this._openMenu = !this._openMenu;
    this.openMenuChange.emit({
      state: this._openMenu,
      menuTitle: this.menuTitle,
      triggerClose: false,
    });
  }
  


  constructor(@Inject(DscAPI_Token) public dscAPI: DscAPIInterface) { }

  baseScale: number = 1;
  ngOnInit() {
    this.baseScale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dscBaseScale'));
  }
  
  print() {
    this.dscAPI.print();
  }
  
  
  @Output() openScheiben = new EventEmitter();
  
  selectParts() {
    this.openScheiben.emit();
  };

}
