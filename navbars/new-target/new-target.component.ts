import { Component, OnInit, Inject } from '@angular/core';
import { DscAPI_Token, DscAPIInterface } from "../../api";

@Component({
  selector: 'app-new-target',
  templateUrl: './new-target.component.html',
  styleUrls: ['./new-target.component.scss']
})
export class NewTargetComponent implements OnInit {

  constructor(@Inject(DscAPI_Token) public dscAPI: DscAPIInterface) { }

  baseScale: number = 1;
  ngOnInit() {
    this.baseScale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dscBaseScale'));
  }

  newTarget() {
    this.dscAPI.setNewTarget()
  }

}
