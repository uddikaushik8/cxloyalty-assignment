import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitesRoutingModule } from './activites-routing.module';
import { ActivitesComponent } from './activites.component';

@NgModule({
  declarations: [ActivitesComponent],
  imports: [CommonModule, ActivitesRoutingModule],
  exports: [ActivitesComponent],
})
export class ActivitesModule {}
