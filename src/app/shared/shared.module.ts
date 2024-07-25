import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabFactoryComponent } from './components/tab-factory/tab-factory.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TabFactoryComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [TabFactoryComponent],
})
export class SharedModule {}
