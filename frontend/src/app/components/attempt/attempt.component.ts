import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.scss']
})
export class AttemptComponent implements OnInit {

  @Input() availableColors: string[] = [];
  @Input() selectedColors: string[] = [];
  @Output() colorChosen = new EventEmitter<string[]>()

  colors: string[] = ['', '', '', ''];
  interactive: boolean = true;
  ready: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.selectedColors.length == 4) {
      this.interactive = false;
      this.colors = this.selectedColors;
    }
  }


  select(index: number, color: string) {
    this.colors[index] = color;

    if (this.colors.findIndex(value => value == '') == -1) {
      this.ready = true;
    }
  }

  submit() {
    if (!this.ready) return;
    this.colorChosen.emit(this.colors);
    this.colors = ['', '', '', ''];
    this.ready = true;
  }

}
