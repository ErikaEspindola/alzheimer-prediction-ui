import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fluxo',
  templateUrl: './fluxo.component.html',
  styleUrls: ['./fluxo.component.scss']
})
export class FluxoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  scrollToNextDiv(el: HTMLElement) {
    el.scrollIntoView();
  }

}
