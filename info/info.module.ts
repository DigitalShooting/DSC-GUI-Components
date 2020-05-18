import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFittextModule } from 'angular-fittext';

import { CurrentShotComponent } from './currentShot/currentShot.component';
import { CurrentSeriesComponent } from './currentSeries/currentSeries.component';
import { SeriesOverviewComponent } from './seriesOverview/seriesOverview.component';
import { PartOverviewComponent } from './partOverview/partOverview.component';
import { ShotArrowComponent } from './shotArrow/shotArrow.component';

@NgModule({
  declarations: [
    CurrentShotComponent, CurrentSeriesComponent, SeriesOverviewComponent, PartOverviewComponent,
    ShotArrowComponent,
  ],
  imports: [
    CommonModule, FlexLayoutModule, AngularFittextModule,
  ],
  exports: [
    CurrentShotComponent, CurrentSeriesComponent, SeriesOverviewComponent, PartOverviewComponent,
  ],
})
export class InfoModule { }
