import { Component, OnInit } from '@angular/core';
import { RequestsService, Articles } from 'src/app/lib/requests.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-articles-home',
  templateUrl: './articles-home.component.html',
  styleUrls: ['./articles-home.component.css']
})
export class ArticlesHomeComponent implements OnInit {
  articles: Articles[] = [];
  start = 0;
  showSpinner = false;
  articlesEnd = false;
  constructor(
    private requestsService: RequestsService
  ) { }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.showSpinner = true;
    this.requestsService.getArticles({
      _sort: 'id', _order: 'desc', _limit: 6, _start: this.start
    }).pipe(
      delay(1000)
    ).subscribe(data => {
      this.articles = [
        ...this.articles,
        ...data
      ];
      this.start = this.start + 6;
      this.handleNoMoreArticles(data);
      this.showSpinner = false;
    })
  }

  onScroll() {
    this.getArticles();
  }

  handleNoMoreArticles(data: Articles[]) {
    if(data.length === 0) {
      this.articlesEnd = true;
    }
  }
}
