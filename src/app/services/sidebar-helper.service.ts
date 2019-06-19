import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarHelperService {

  constructor() {
  }

  public getStaticProjectList() {
    return [
      {
        Guid: "3576B579-D2AB-4270-A6E3-86C5AE5B1CF1",
        Number: "10000",
        Description: "Corporate - Internal Project",
        LockedTillDate: null,
        client: 'Hyundai',
        status: 'Active'
      },
      {
        "Guid": "927B8C71-16F4-40C6-87BC-9E41B476C1FA",
        "Number": "99991",
        "Description": "Engineering - Albany Reservoir Upgrades",
        "LockedTillDate": "2019-03-29T18:30:00.000Z",
        client: 'Bajaj',
        status: 'Active'
      },
      {
        "Guid": "EA5B0782-F272-4258-86DB-7BD90D18781F",
        "Number": "99992",
        "Description": "Engineering - Plant SCADA Upgrades",
        "LockedTillDate": null,
        client: 'Honda',
        status: 'Completed'
      },
      {
        "Guid": "B622C4C6-6622-4013-8E29-EC0FE6946461",
        "Number": "99993",
        "Description": "Food Plant - T&M Technical Support Contract",
        "LockedTillDate": "2019-03-29T18:30:00.000Z",
        client: 'Samsung',
        status: 'Not-Started'
      },
      {
        "Guid": "438B86CD-5E2F-4AA9-888D-1FFFFFB6EBEC",
        "Number": "99994",
        "Description": "Software Development - Time Sheet Application",
        "LockedTillDate": "2019-06-11T18:30:00.000Z",
        client: 'Nokia',
        status: 'Requires Help'
      },
      {
        "Guid": "5D3F53ED-79AF-47DF-B15C-98E275EB4417",
        "Number": "99995",
        "Description": "Architecture - Westside Building Design",
        "LockedTillDate": "2019-04-29T18:30:00.000Z",
        client: 'Dell',
        status: 'Active'
      },
      {
        "Guid": "0F675397-F091-457A-ABEF-7B859BB9409D",
        "Number": "99996",
        "Description": "Engineering - Park Rd. Pump Station",
        "LockedTillDate": "2019-04-29T18:30:00.000Z",
        client: 'Lenovo',
        status: 'Waiting On-Hold'
      },
      {
        "Guid": "870FBF71-D648-4756-B668-2D56B54F0CF3",
        "Number": "99997",
        "Description": "Manufacturing - Factory Process Expansion",
        "LockedTillDate": "2019-04-29T18:30:00.000Z",
        client: 'Chai pe charcha',
        status: 'Active'
      },
      {
        "Guid": "C2680E29-89B4-4B54-8728-EF50179B6A53",
        "Number": "99998",
        "Description": "Marketing - Website Design & SEO/SEM",
        "LockedTillDate": "2019-04-29T18:30:00.000Z",
        client: 'Dominos',
        status: 'Active'
      },
      {
        "Guid": "F1AB3F29-6DE7-472E-AE0B-55AFFF921F57",
        "Number": "99999",
        "Description": "IT - Plant Server & Network Upgrade",
        "LockedTillDate": "2019-04-29T18:30:00.000Z",
        client: 'Chevrolet',
        status: 'Active'
      }
    ];
  }
}
