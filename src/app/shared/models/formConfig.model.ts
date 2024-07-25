export interface FormDataInterface {
  departure: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  travellers: number;
  class: string;
}

export interface FormConfigInterface {
  title: string;
  formData: FormDataInterface | null;
  controls: ControlConfigInterface[];
}

export interface ControlConfigInterface {
  formControl: keyof FormDataInterface;
  label: string;
  validators: {
    required: boolean;
    dateValidator: boolean;
    minLengthValidator?: boolean;
  };
  inputType: string;
  autoCompleteRequired: boolean;
  defaultValues: string[] | null;
}
