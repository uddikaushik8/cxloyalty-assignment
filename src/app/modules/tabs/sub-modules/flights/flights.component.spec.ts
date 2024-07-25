import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FlightsComponent } from './flights.component';
import { SharedModule } from '../../../../shared/shared.module';
import { FlightsService } from '../../../../shared/services/flights.service';

fdescribe('FlightsComponent', () => {
  let component: FlightsComponent;
  let fixture: ComponentFixture<FlightsComponent>;
  let mockFlightService = {
    flightSearchData: () => ({
      departure: 'Delhi',
      destination: 'Mumbai',
      departureDate: '2021-12-12',
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, SharedModule],
      declarations: [FlightsComponent],
      providers: [{ provide: FlightsService, useValue: mockFlightService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formConfig', () => {
    expect(component.formConfig).toBeDefined();
    expect(component.formConfig.title).toBe('Flight Booking');
    expect(component.formConfig.controls.length).toBe(6);
  });

  it('should initialize cities', () => {
    expect(component.cities).toBeDefined();
    expect(component.cities.length).toBeGreaterThan(0);
  });

  it('should initialize toFilteredCities and fromFilteredCities', () => {
    expect(component.toFilteredCities).toBeDefined();
    expect(component.fromFilteredCities).toBeDefined();
  });

  it('should call flightService.flightSearchData and navigate to /flights/search on form submission', () => {
    const mockEvent = {
      departure: 'Delhi',
      destination: 'Mumbai',
      departureDate: '2021-12-12',
    };
    spyOn((component as any).router, 'navigate').and.callThrough();
    component.onSubmit(mockEvent);
    expect((component as any).router.navigate).toHaveBeenCalledWith(
      ['/flights/search'],
      { queryParams: mockEvent }
    );
  });
});
