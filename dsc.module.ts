import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarsModule } from './navbars/navbars.module';
import { InfoModule } from './info/info.module';
import { DscComponent } from './dsc/dsc.component';
import { DscPrintComponent } from './dsc-print/dsc-print.component';
import { TargetModule } from './target/target.module';



@NgModule({
  declarations: [
    DscComponent,
    DscPrintComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    BrowserAnimationsModule,
    NavbarsModule,
    InfoModule,
    TargetModule,
  ],
  exports: [
    DscComponent,
    DscPrintComponent,
    TargetModule,
  ],
})
export class DscModule { }
