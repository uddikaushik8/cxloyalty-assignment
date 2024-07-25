import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsComponent } from './flights.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';

const routes: Routes = [
  { path: '', component: FlightsComponent },
  { path: 'flights/search', component: FlightSearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlightsRoutingModule {}
