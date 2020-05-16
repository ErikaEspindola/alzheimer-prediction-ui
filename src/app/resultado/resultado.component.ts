import { Component, OnInit, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {

  constructor() { }

  @Input() result: string;

  loading: boolean;

  ngOnInit() {

    this.loading = true;
  }

  ngOnChanges(change) {

    this.loading = change.result.currentValue == "";
  }

  scrollToNextDiv(el: HTMLElement) {
    el.scrollIntoView();
  }
}
