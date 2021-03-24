import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FavsService } from 'src/app/lib/favs.service';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrls: ['./favs.component.css']
})
export class FavsComponent implements OnInit, OnChanges {
  active = true; // TRUE == ADD TO FAVS, FALSE = ALREADY IN FAVS
  @Input() postId: number;
  constructor(
    private favsService: FavsService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.active = this.favsService.checkFavStatus(this.postId);
  }

  toggleFav() {
    this.active = this.favsService.onToggleFav(this.postId);
  }
}
