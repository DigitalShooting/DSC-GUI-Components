import { Component, OnInit, Inject } from '@angular/core';
import { DscAPI_Token, DscAPIInterface } from "../../api";

@Component({
  selector: 'app-new-target',
  templateUrl: './new-target.component.html',
  styleUrls: ['./new-target.component.scss']
})
export class NewTargetComponent implements OnInit {

  constructor(@Inject(DscAPI_Token) public dscAPI: DscAPIInterface) { }

  ngOnInit() { }

  newTarget() {
    this.dscAPI.setNewTarget()
  }

}
