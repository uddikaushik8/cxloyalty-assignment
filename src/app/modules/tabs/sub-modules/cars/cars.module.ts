import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';

@NgModule({
  declarations: [CarsComponent],
  imports: [CommonModule, CarsRoutingModule],
  exports: [CarsComponent],
})
export class CarsModule {}
