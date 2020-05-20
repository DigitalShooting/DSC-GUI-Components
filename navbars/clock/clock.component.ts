import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
})
export class ClockComponent implements OnInit, OnDestroy {
  date: Date = new Date();
  timerID: number;

  constructor() {
    this.timerID = setInterval(() => this.date = new Date(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timerID);
  }
  
  baseScale: number = 1;
  ngOnInit() {
    this.baseScale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dscBaseScale'));
  }
}
