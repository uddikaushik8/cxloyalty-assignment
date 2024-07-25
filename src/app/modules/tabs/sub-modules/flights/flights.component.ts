import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Cities } from '../../../../shared/constants/tabs.constant';
import { Router } from '@angular/router';
import { FlightsService } from '../../../../shared/services/flights.service';
import { FormConfigInterface } from '../../../../shared/models/formConfig.model';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss',
})
export class FlightsComponent {
  searchForm!: FormGroup;
  cities: string[] = Cities;
  toFilteredCities: string[] = [];
  fromFilteredCities: string[] = [];
  formConfig!: FormConfigInterface;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private flightService: FlightsService
  ) {}

  ngOnInit(): void {
    this.formConfig = {
      title: 'Flight Booking',
      controls: [
        {
          formControl: 'departure',
          label: 'Departure',
          validators: {
            required: true,
            dateValidator: false,
          },
          inputType: 'text',
          autoCompleteRequired: true,
          defaultValues: Cities,
        },
        {
          formControl: 'destination',
          label: 'Destination',
          validators: {
            required: true,
            dateValidator: false,
          },
          inputType: 'text',
          autoCompleteRequired: true,
          defaultValues: Cities,
        },
        {
          formControl: 'departureDate',
          label: 'Departure Date',
          validators: {
            required: true,
            dateValidator: true,
          },
          inputType: 'date',
          autoCompleteRequired: false,
          defaultValues: null,
        },
        {
          formControl: 'returnDate',
          label: 'Return Date',
          validators: {
            required: true,
            dateValidator: true,
          },
          inputType: 'date',
          autoCompleteRequired: false,
          defaultValues: null,
        },
        {
          formControl: 'travellers',
          label: 'Travellers',
          validators: {
            required: true,
            dateValidator: false,
            minLengthValidator: true,
          },
          inputType: 'number',
          autoCompleteRequired: false,
          defaultValues: null,
        },
        {
          formControl: 'class',
          label: 'Class',
          validators: {
            required: true,
            dateValidator: false,
          },
          inputType: 'dropdown',
          autoCompleteRequired: false,
          defaultValues: ['Economy', 'Business', 'First'],
        },
      ],
      formData: this.flightService.flightSearchData
        ? this.flightService.flightSearchData
        : null,
    };
  }

  onSubmit(event: any) {
    this.flightService.flightSearchData = event;
    this.router.navigate(['/flights/search'], {
      queryParams: event,
    });
  }
}
