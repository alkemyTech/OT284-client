import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {

  activity={ id: 2056,
    name: "actividad 02",
    slug: "",
    description: "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.",
    image: "http://ongapi.alkemy.org/storage/oqhHt6tOMb.png",
    user_id: 1,
    category_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null
    };

  constructor( private route: ActivatedRoute,) { }

  ngOnInit(): void {
    /* this.route.queryParams.subscribe(params => {
      this.activity = params
    }); */
  }

}
