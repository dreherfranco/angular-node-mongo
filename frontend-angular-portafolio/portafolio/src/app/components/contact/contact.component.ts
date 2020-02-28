import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public width: Number;
  public widthToSlider: any;
  public captions: boolean;

  constructor() { 
    this.widthToSlider = false;
    this.captions = false;
  }

  ngOnInit() {
  }

  charge(){
    this.widthToSlider = this.width;
  }
  restart(){
    this.widthToSlider = false;
    
  }
  subtitle(){
    this.captions = true;
  }
  noSubtitle(){
    this.captions = false;
  }
}
