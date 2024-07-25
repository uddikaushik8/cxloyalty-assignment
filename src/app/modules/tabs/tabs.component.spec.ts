import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsComponent } from './tabs.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TabsInterface } from '../../shared/models/tabs.model';

fdescribe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let activateRoute: ActivatedRoute;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);
    const fakeActivatedRoute = {
      snapshot: { data: {} },
    } as ActivatedRoute;

    await TestBed.configureTestingModule({
      declarations: [TabsComponent],
      imports: [RouterModule.forRoot([])],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: Router, useValue: spy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activateRoute = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select the tab and navigate to the corresponding route', () => {
    const tab: TabsInterface = {
      label: 'Flight',
      route: '/flights',
    };
    component.selectTab(tab);
    expect(component.selectedTab).toBe(tab.label);
    expect(component.tabsLink).toBe(tab.route);
    expect(routerSpy.navigate).toHaveBeenCalledWith([tab.route]);
  });
});
