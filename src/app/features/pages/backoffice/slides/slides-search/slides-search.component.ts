import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-slides-search',
  templateUrl: './slides-search.component.html',
  styleUrls: ['./slides-search.component.scss']
})
export class SlidesSearchComponent implements OnInit {

  text: any;
  @Output() debounceOutput: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    const txtBuscar = <HTMLInputElement>document.getElementById("txtBuscar")!;
    const keyUp = fromEvent(txtBuscar, "keyup");
    const result = keyUp.pipe(
      debounceTime(500)
    );

    result.subscribe(() => {
      this.debounceOutput.emit(txtBuscar.value);
    })
  }
}
