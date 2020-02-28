import { Component, OnInit, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() widthSlider: number;
  @Input('subtitulos') captions: boolean;
  constructor() { }

  ngOnInit() {
    $('.bxslider').bxSlider({
      mode: 'fade',
      captions: this.captions,
      slideWidth: this.widthSlider
    });
  }

}
