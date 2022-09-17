import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnInit {

  @Input() Cwidth: number;
  @Input() Cheight: number;
  @Input() Ccircle: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  getMyStyles(){
    const myStyles = {
      'width.px': this.Cwidth ? this.Cwidth : '',
      'height.px': this.Cheight ? this.Cheight : '',
      'border-radius': this.Ccircle ? '50%' : '0'
    }

    return myStyles;
  }

}
