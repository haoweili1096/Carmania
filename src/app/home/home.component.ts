import { Component, OnInit } from '@angular/core';
import { RequestsService, Articles } from '../lib/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  carouselArticles: Articles[];
  constructor(
    private requestsService: RequestsService
  ) { }

  ngOnInit() {
    this.requestsService.getArticles({
      _sort: 'id', _order: 'desc', _start: 0, _end: 5
    }).subscribe(
      data => { 
        this.carouselArticles = data;
        console.log(this.carouselArticles);
      }
    );
  }

}
