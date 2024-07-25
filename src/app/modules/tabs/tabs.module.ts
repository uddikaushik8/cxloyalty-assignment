import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsRoutingModule } from './tabs-routing.module';
import { ActivitesModule } from './sub-modules/activites/activites.module';
import { CarsModule } from './sub-modules/cars/cars.module';
import { FlightsModule } from './sub-modules/flights/flights.module';
import { HotelsModule } from './sub-modules/hotels/hotels.module';
import { TabsComponent } from './tabs.component';

@NgModule({
  declarations: [TabsComponent],
  imports: [
    CommonModule,
    TabsRoutingModule,
    ActivitesModule,
    CarsModule,
    FlightsModule,
    HotelsModule,
  ],
  exports: [TabsComponent],
})
export class TabsModule {}
