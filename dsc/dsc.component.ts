import { Component, OnInit, ViewEncapsulation, Inject, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Session, DisciplinePart, Part, Config, DSCMessage } from "../classes/session";

import { DscAPI_Token, DscAPIInterface } from "../api";

@Component({
  selector: 'app-dsc',
  templateUrl: './dsc.component.html',
  styleUrls: ['./dsc.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ opacity: 0 }),
            animate('200ms', style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ opacity: 1 }),
            animate('200ms', style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class DscComponent implements OnInit {

  selectedShotIndex: number = 0;
  selectedSeriesIndex: number = 0;
  
  disciplinePart: DisciplinePart;
  
  // Enable user edit (change part, change disciplin, actions, ...)
  @Input() enableEdit: boolean = true;
  
  session: Session;
  config: Config;
  dscStatus: boolean = true;
  activePart: Part;
  
  hasOpenMenu = {state: false, menuTitle: "", triggerClose: false};
  closeMenu() {
    this.hasOpenMenu = {state: false, menuTitle: "", triggerClose: true};
  }
  
  
  messageHideTimeout: number;
  message: DSCMessage;
  
  constructor(@Inject(DscAPI_Token) public dscAPI: DscAPIInterface) {
    dscAPI.connected.subscribe(connected => console.log("isConnected", connected))
    dscAPI.session.subscribe(session => {
      // console.log("setSession", session);
      
      if (session != null) {
        this.activePart = session.sessionParts[session.sessionIndex];
        
        if (this.activePart.anzahl > 0) {
          this.selectedSeriesIndex = this.activePart.serien.length - 1;
          this.selectedShotIndex = this.activePart.serien[this.selectedSeriesIndex].shots.length - 1;
        }
        else {
          this.selectedSeriesIndex = null;
          this.selectedShotIndex = null;
        }
        
        this.disciplinePart = session.disziplin.parts[this.activePart.type]
      }
      this.session = session;
      
      
    });
    
    dscAPI.config.subscribe(config => {
      this.config = config;
    });
    
    dscAPI.status.subscribe(dscStatus => {
      this.dscStatus = dscStatus;
    });
    
    dscAPI.message.subscribe(message => {
      clearTimeout(this.messageHideTimeout);
      this.message = message
      this.messageHideTimeout = setTimeout(() => {
        this.message = null;
      }, 5000);
    });
	}
  
  getCurrentShot(){
    return this.getCurrentSeries().shots[this.selectedShotIndex];
  }
  getCurrentSeries(){
    return this.activePart.serien[this.selectedSeriesIndex];
  }

  ngOnInit() {
  }
  
  
  
  openModalPartSelect: boolean = false;
  onPartSelection(show: boolean) {
    this.openModalPartSelect = show;
  }

}
