import { Component, OnInit } from '@angular/core';
import {MastermindService} from "../../services/mastermind.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private service: MastermindService) { }

  gameId: string = '';

  ngOnInit(): void {

  }

  reset() {
    this.service.gameHistory = [];
    this.service.gameState = 0;
  }

  resumeGame() {
      this.service.loadGame(this.gameId);
  }
}
