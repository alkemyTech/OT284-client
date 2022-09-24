import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { fromEvent, interval } from 'rxjs';
import { debounce, debounceTime, scan } from 'rxjs/operators';
import { NewsSlidesService } from 'src/app/core/services/news-slides.service';

@Component({
  selector: 'app-slides-search',
  templateUrl: './slides-search.component.html',
  styleUrls: ['./slides-search.component.scss']
})
export class SlidesSearchComponent implements OnInit {

  text: any;
  @Output() debounceOutput: EventEmitter<any> = new EventEmitter<any>();
  constructor(private http: NewsSlidesService) { }

  ngOnInit(): void {
  }


  onKeyUp(event: any) {
    const txtBuscar = <HTMLInputElement>document.getElementById("txtBuscar")!;
    const keyUp = fromEvent(txtBuscar, "keyup");

    const result = keyUp.pipe(
      scan(i => i++, 1),
      debounceTime(500)
    );

    result.subscribe(() => {
      this.http.getSlideFilter(txtBuscar.value).subscribe((data: any) => {
        this.debounceOutput.emit(data.data);
      })
    })

  }
}
