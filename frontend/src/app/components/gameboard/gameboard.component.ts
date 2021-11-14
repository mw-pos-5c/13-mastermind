import { Component, OnInit } from '@angular/core';
import {MastermindService} from "../../services/mastermind.service";

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss']
})
export class GameboardComponent implements OnInit {

  constructor(public service: MastermindService) { }

  ngOnInit(): void {
  }

  colorSelected(colors: string[]) {
    console.log(colors);
    this.service.submitColors(colors);
  }
}
