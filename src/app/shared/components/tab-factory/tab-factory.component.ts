import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noPastDateValidator } from '../../validators/custom-validators';
import {
  ControlConfigInterface,
  FormConfigInterface,
} from '../../models/formConfig.model';
import { FlightFormInterface } from '../../models/flighForm.model';

@Component({
  selector: 'app-tab-factory',
  templateUrl: './tab-factory.component.html',
  styleUrl: './tab-factory.component.scss',
})
export class TabFactoryComponent implements OnChanges {
  @Input() formConfig!: FormConfigInterface;
  @Output() onFormSubmit: EventEmitter<FlightFormInterface> =
    new EventEmitter();
  searchForm!: FormGroup;
  filteredOptions: { [key: string]: string[] } = {};

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['formConfig'] &&
      changes['formConfig'].previousValue !=
        changes['formConfig'].currentValue &&
      changes['formConfig'].currentValue
    ) {
      this.createSearchForm();
    }
  }

  createSearchForm() {
    this.searchForm = this.fb.group({});
    this.formConfig.controls.forEach((control: ControlConfigInterface) => {
      const validators = this.getValidators(control.validators);
      this.searchForm.addControl(
        control.formControl,
        this.fb.control('', validators)
      );
      if (control.autoCompleteRequired) {
        this.onChange(control);
      }
      if (this.formConfig.formData) {
        this.searchForm.controls[control.formControl].setValue(
          this.formConfig.formData[control.formControl]
            ? this.formConfig.formData[control.formControl]
            : null
        );
      }
    });
  }

  onChange(control: ControlConfigInterface) {
    this.searchForm.get(control.formControl)?.valueChanges.subscribe((val) => {
      this.filteredOptions[control.formControl] = this.filterCities(
        val,
        control.defaultValues ?? []
      );
    });
  }

  filterCities(val: string, cities: string[]): string[] {
    return cities.filter((city) =>
      city.toLowerCase().includes(val.toLowerCase())
    );
  }

  getValidators(validatorsConfig: {
    required: boolean;
    dateValidator: boolean;
    minLengthValidator?: boolean;
  }) {
    const validators = [];
    if (validatorsConfig) {
      if (validatorsConfig.required) {
        validators.push(Validators.required);
      }
      if (validatorsConfig.dateValidator) {
        validators.push(noPastDateValidator());
      }
      if (validatorsConfig.minLengthValidator) {
        validators.push(Validators.min(1));
      }
    }
    return validators;
  }

  selectCity(controlName: string, city: string): void {
    this.searchForm.get(controlName)?.setValue(city);
    this.filteredOptions[controlName] = [];
  }

  onSubmit() {
    if (this.searchForm.valid) {
      this.onFormSubmit.emit(this.searchForm.value);
    }
  }
}
