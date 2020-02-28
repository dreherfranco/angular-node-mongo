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
  public author: any;

  constructor() { 
    this.widthToSlider = false;
    this.captions = false;
    this.author = {
      name: "",
      phone: 0,
      github: ""
    }
  }

  ngOnInit() {
    console.log(this.author);
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

  eventAuthor(e){
    this.author = e;
  }
}
