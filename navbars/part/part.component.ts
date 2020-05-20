import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { DisciplinePart, Part, Session } from "../../classes/session";
import { DscAPI_Token, DscAPIInterface } from "../../api";

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent implements OnInit {
  
  // Enable user edit (change part, change disciplin, actions, ...)
  @Input() enableEdit: boolean = false;
  
  @Output()
  openPartModal = new EventEmitter<boolean>();
  
  onClickPart() {
    // this.openPartModal.emit();
  }
  
  onHover(state: boolean) {
    this.openPartModal.emit(state);
  }

  activeDisciplinePart: DisciplinePart;
  activePart: Part;
  disciplineParts: DisciplinePart[];
  _session: Session;
  @Input()
  set session(session: Session) {
    this._session = session;
    this.activePart = session.sessionParts[session.sessionIndex];
    this.activeDisciplinePart = session.disziplin.parts[this.activePart.type];
    // this.disciplineParts = session.disziplin.parts;
    // Object.keys(session.disziplin.parts).forEach(dPart => {
    //   let active_part = session.active_part;
    //   let part = session.parts[active_part];
    //   if (dPart.id == part.part_type) {
    //     this.disciplinePart = dPart;
    //     return;
    //   }
    // });
  }
  
  
  // getDisciplinePart(type: String): DisciplinePart {
  //   return this._session.discipline.parts.find(part => part.id == type);
  // }
  
  // selectPart(partId: number) {
  // 
  // }
  
  
  
  togglePart() {
    if (this.enableEdit) {
      this.dscAPI.togglePart();
    }
  }
  


  constructor(@Inject(DscAPI_Token) public dscAPI: DscAPIInterface) { }

  baseScale: number = 1;
  ngOnInit() {
    this.baseScale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dscBaseScale'));
  }

}
