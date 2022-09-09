import { Component, OnInit,OnDestroy, ViewEncapsulation, ElementRef,Input,ViewChild, AfterViewInit } from '@angular/core';
import videojs from 'video.js';
import 'videojs-youtube';

@Component({
  selector: 'app-vjs-player',
  templateUrl: './vjs-player.component.html',
  styleUrls: ['./vjs-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('target') target: ElementRef;

  @Input() options: {
    fluid: boolean,
    aspectRatio: string,
    autoplay: boolean,
    sources: {
      src: string,
      type: string,
      }[],
  };
  player:videojs.Player;
  
  constructor(private elementRef:ElementRef) {
    
   }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
      });
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

}
