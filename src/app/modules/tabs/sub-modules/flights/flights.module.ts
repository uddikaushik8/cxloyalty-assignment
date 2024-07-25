import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightsRoutingModule } from './flights-routing.module';
import { FlightsComponent } from './flights.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared.module';
import { FlightSearchComponent } from './flight-search/flight-search.component';

@NgModule({
  declarations: [FlightsComponent, FlightSearchComponent],
  imports: [
    CommonModule,
    FlightsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
  ],
  exports: [FlightsComponent],
})
export class FlightsModule {}
