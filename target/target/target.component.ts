import { Component, OnInit, Input } from '@angular/core';

import { Session, Target, Serie } from "../../classes/session";

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
})
export class TargetComponent implements OnInit {
  
  @Input() target: Target;
  @Input() series: Serie;
  @Input() selectedShotIndex: number = null;
  @Input() line: string = '';

  @Input() has_trial_corner: boolean = false;

  @Input() width: string = "200";
  @Input() height: string = "200";

  viewBox: string = "";
  radius: number;
  border_width: number;
  scale: number;
  
  ngOnChanges() {
    if (this.target == null) {return}
    
    this.radius = this.target.ringe[this.target.ringe.length-1].width + 1;
    this.border_width = this.radius / 400;

    if (this.series != null && this.selectedShotIndex != null) {
      this.scale = this.calculateScale(this.series, this.target);
    }
    else {
      this.scale = 1;
    }
    this.viewBox = ((-this.radius)/this.scale) + " " + ((-this.radius)/this.scale) + " " + ((2*this.radius)/this.scale) + " " + ((2*this.radius)/this.scale);
    
    setTimeout(this.safariFix.bind(this), 500);
  }

  private calculateScale(series: Serie, target: Target): number {
    var shot = series.shots[this.selectedShotIndex];
    
    var zoom = 1;
    if (shot != null) {
      target.ringe.every(ring => {
        if (ring.value == shot.ring.int) {
          if (ring.zoomScale != null) {
            zoom = ring.zoomScale;
            return false;
          }
        }
        return true;
      });
    }
    return zoom;
  }
  
  
  
  
  calculateHeight: () => void = () => {};
  
  ngOnInit() {
    this.safariFix();
  }
  
  safariFix() {
    var ua = navigator.userAgent.toLowerCase(); 
    if (ua.indexOf('safari') != -1) { 
      if (ua.indexOf('chrome') > -1) { // Chrome
      } else { // Safari
        this.calculateHeight = () => {
          this.height = document.getElementById("target_super"+this.line).clientHeight + "px";
        }
      }
    }
  }
  
  ngAfterViewInit() {
    setTimeout(this.calculateHeight, 200);
  }
  
  onResize(event) {
    this.calculateHeight()
    setTimeout(this.calculateHeight, 500);
  }
}
