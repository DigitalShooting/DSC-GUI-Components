import { Component, Output, Input, EventEmitter, Inject } from '@angular/core';

import { Session, Part } from "../../classes/session";
import { DscAPI_Token, DscAPIInterface } from "../../api";

@Component({
  selector: 'app-part-overview',
  templateUrl: './partOverview.component.html',
  styleUrls: ['./partOverview.component.scss'],
})
export class PartOverviewComponent {
  
  @Input() session: Session;
  @Output() onSelection = new EventEmitter<null>();
  
  selectPart(index: number) {
    this.dscAPI.setSessionIndex(index);
    this.onSelection.emit();
  }
  
  closeDetail() {
    this.onSelection.emit();
  }

  constructor(@Inject(DscAPI_Token) public dscAPI: DscAPIInterface) { }
}
