import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';

import { Session, Serie, Target } from "../../classes/session";

@Component({
  selector: 'app-current-series',
  templateUrl: './currentSeries.component.html',
  styleUrls: ['./currentSeries.component.scss']
})
export class CurrentSeriesComponent implements OnInit {
  
  @Input() series: Serie;
  
  @Input() selectedShotIndex: number;
  @Output() onChangeSelection = new EventEmitter<number>();
  
  selectShot(index: number) {
    this.onChangeSelection.emit(index);
  }
  
  constructor() { }
  
  baseScale: number = 1;
  ngOnInit() {
    this.baseScale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dscBaseScale'));
  }
  
}
