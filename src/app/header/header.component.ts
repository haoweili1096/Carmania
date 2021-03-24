import { Component, OnInit } from '@angular/core';
import { Nav, NavService } from '../lib/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  routes: Nav[];
  constructor(
    private navService: NavService
  ) { }

  ngOnInit() {
    this.routes = this.navService.routes;
  }

  

}