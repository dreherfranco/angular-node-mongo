import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() widthSlider: number;
  @Input('subtitulos') captions: boolean;
  @Output() getAuthor = new EventEmitter();
  public data: any;
  constructor() {
    this.data = {
      name: "Franco",
      phone: 3434378954,
      github: "dreherfranco"
    };
   }

  ngOnInit() {
    $('.bxslider').bxSlider({
      mode: 'fade',
      captions: this.captions,
      slideWidth: this.widthSlider
    });

    //Conseguir autor mediante @Output()
    this.getAuthor.emit(this.data);
  }

}
