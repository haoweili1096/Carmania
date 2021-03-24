import { Component, OnInit } from '@angular/core';
import { RequestsService, Articles } from 'src/app/lib/requests.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Articles;
  latestArticles: Articles[];
  content;
  constructor(
    private requestsService: RequestsService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    // GET THE POST DATA
    this.getArticleData(this.activatedRoute.snapshot.params);

    this.activatedRoute.params.subscribe((params: Params) => {
      this.getArticleData(params);
    });

    // GET LATESTS POSTS
    this.requestsService.getArticles({
      _sort: 'id', _order: 'desc', _limit: 5
    }).subscribe(
      articles => {
        this.latestArticles = articles;
      } 
    );
  }

  getArticleData(params) {
    this.requestsService.getArticle(params).subscribe(
      article => {
        this.article = article;
        this.content = this.sanitizer.sanitize(1, article.content);
      }
    );
  }
}
