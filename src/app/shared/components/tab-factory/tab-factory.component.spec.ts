import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TabFactoryComponent } from './tab-factory.component';
import { Cities } from '../../constants/tabs.constant';

fdescribe('TabFactoryComponent', () => {
  let component: TabFactoryComponent;
  let fixture: ComponentFixture<TabFactoryComponent>;
  const formConfig = {
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
    ],
    formData: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [TabFactoryComponent],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabFactoryComponent);
    component = fixture.componentInstance;
    component.formConfig = {
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
      ],
      formData: null,
    };
    component.searchForm = new FormGroup({
      departure: new FormControl(),
      destination: new FormControl(),
      departureDate: new FormControl(),
      returnDate: new FormControl(),
      travellers: new FormControl(),
      class: new FormControl(),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize searchForm', () => {
    expect(component.searchForm).toBeInstanceOf(FormGroup);
  });

  it('should emit onFormSubmit event when onSubmit is called', () => {
    spyOn(component.onFormSubmit, 'emit');
    component.onSubmit();
    expect(component.onFormSubmit.emit).toHaveBeenCalled();
  });

  it('should call createSearchForm when formConfig changes', () => {
    component.formConfig = {
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
          defaultValues: [],
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
          defaultValues: [],
        },
      ],
      formData: null,
    };
    fixture.detectChanges();

    spyOn(component, 'createSearchForm');
    component.ngOnChanges({
      formConfig: {
        previousValue: null,
        currentValue: formConfig,
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.createSearchForm).toHaveBeenCalled();
  });

  it('should create searchForm with controls', () => {
    component.createSearchForm();
    const formControls = component.searchForm.controls;
    expect(formControls['departure']).toBeDefined();
    expect(formControls['destination']).toBeDefined();
  });

  it('should set default values for searchForm controls', () => {
    component.formConfig.formData = {
      departure: 'New York',
      destination: 'London',
      departureDate: '29-09-2024',
      returnDate: '01-10-2024',
      travellers: 2,
      class: 'Economy',
    };
    component.createSearchForm();
    const formControls = component.searchForm.controls;
    expect(formControls['departure'].value).toBe('New York');
    expect(formControls['destination'].value).toBe('London');
  });

  it('should call onChange for controls with autoCompleteRequired', () => {
    spyOn(component, 'onChange');
    component.createSearchForm();
    expect(component.onChange).toHaveBeenCalledTimes(2);
  });

  it('should return the cities that include the input value (case-insensitive)', () => {
    const cities = ['New York', 'London', 'Paris'];
    const result = component.filterCities('n', cities);
    expect(result).toEqual(['New York', 'London']);
  });

  it('should return an empty array if no cities include the input value', () => {
    const cities = ['New York', 'London', 'Paris'];
    const result = component.filterCities('Tokyo', cities);
    expect(result).toEqual([]);
  });

  it('should select city and clear filtered options', () => {
    const controlName = 'departure';
    const city = 'New York';
    component.selectCity(controlName, city);
    expect(component.searchForm.get(controlName)?.value).toBe(city);
    expect(component.filteredOptions[controlName]).toEqual([]);
  });

  it('should emit onFormSubmit event with searchForm value when onSubmit is called and searchForm is valid', () => {
    spyOn(component.onFormSubmit, 'emit');
    component.searchForm.setValue({
      departure: 'New York',
      destination: 'London',
      departureDate: '22-01-2024',
      returnDate: '29-01-2024',
      travellers: 2,
      class: 'Economy',
    });
    component.onSubmit();
    expect(component.onFormSubmit.emit).toHaveBeenCalledWith({
      departure: 'New York',
      destination: 'London',
      departureDate: '22-01-2024',
      returnDate: '29-01-2024',
      travellers: 2,
      class: 'Economy',
    });
  });
});
