import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'flights',
        loadChildren: () =>
          import('./sub-modules/flights/flights.module').then(
            (m) => m.FlightsModule
          ),
      },
      {
        path: 'hotels',
        loadChildren: () =>
          import('./sub-modules/hotels/hotels.module').then(
            (m) => m.HotelsModule
          ),
      },
      {
        path: 'cars',
        loadChildren: () =>
          import('./sub-modules/cars/cars.module').then((m) => m.CarsModule),
      },
      {
        path: 'activity',
        loadChildren: () =>
          import('./sub-modules/activites/activites.module').then(
            (m) => m.ActivitesModule
          ),
      },
      // {
      //   path: 'flights/search',
      //   loadChildren: () =>
      //     import('./sub-modules/flight-search/flight-search.module').then(
      //       (m) => m.FlightSearchModule
      //     ),
      // },
      { path: '', redirectTo: 'flights', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsRoutingModule {}
