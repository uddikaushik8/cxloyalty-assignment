import { Component, OnInit } from '@angular/core';
import {
  TabsNameConstants,
  TabsRouteConstants,
} from '../../shared/constants/tabs.constant';
import { TabsInterface } from '../../shared/models/tabs.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent implements OnInit {
  TABS_ROUTE_CONST = TabsRouteConstants.TABS_ROUTES;
  TABS_NAME_CONST = TabsNameConstants.TABS_NAME;
  tabs: TabsInterface[] = [
    {
      label: this.TABS_NAME_CONST.FLIGHTS,
      route: this.TABS_ROUTE_CONST.FLIGHTS,
    },
    { label: this.TABS_NAME_CONST.HOTELS, route: this.TABS_ROUTE_CONST.HOTELS },
    { label: this.TABS_NAME_CONST.CARS, route: this.TABS_ROUTE_CONST.CARS },
    {
      label: this.TABS_NAME_CONST.ACTIVITY,
      route: this.TABS_ROUTE_CONST.ACTIVITY,
    },
  ];
  selectedTab = this.TABS_NAME_CONST.FLIGHTS;
  tabsLink = this.TABS_ROUTE_CONST.FLIGHTS;

  constructor(private router: Router) {}

  ngOnInit() {}

  selectTab(tab: TabsInterface) {
    this.selectedTab = tab.label;
    this.tabsLink = tab.route;
    this.router.navigate([tab.route]);
  }
}
