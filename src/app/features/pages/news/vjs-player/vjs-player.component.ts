import { OnDestroy, ViewEncapsulation, ElementRef,Input,ViewChild, AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import videojs from 'video.js';


@Component({
  selector: 'app-vjs-player',
  templateUrl: './vjs-player.component.html',
  styleUrls: ['./vjs-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VjsPlayerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('target', {static: true}) target: ElementRef;

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
    let body=document.body;
    let script=document.createElement('script');
    script.type='text/javascript';
    script.innerHTML='';
    script.src='./youtube.js';
    script.async=true;
    script.defer=true;
    body.appendChild(script);
  }

  ngAfterViewInit() {
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
    this.player.canPlayType('videoyoutube')
    this.player.src('https://www.youtube.com/watch?v=4YnSk1gI_Oo');
  }


  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }

}
