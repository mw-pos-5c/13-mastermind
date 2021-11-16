import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import NewGameResponse from "../models/NewGameResponse";
import HistoryAttempt from "../models/HistoryAttempt";
import SubmitResponse from "../models/SubmitResponse";
import {Subject} from "rxjs";
import LoadGameResponse from "../models/LoadGameResponse";

@Injectable({
  providedIn: 'root'
})
export class MastermindService {

  constructor(private http: HttpClient) {
  }

  private url = 'http://localhost:5000/game/';

  onHttpRequest = new Subject<string>();

  gameState: number = 0;

  gameId: string | null = null;
  gameName: string | null = null;
  gameColors: string[] = [];
  gameTries: number = 12;

  gameHistory: HistoryAttempt[] = [];

  startGame(name: string, tries: number) {
    this.http.post<NewGameResponse>(this.url + 'start', {name, tries}).subscribe(value => {
      this.gameState = 1;
      this.gameId = value.gameId;
      this.gameName = name;
      this.gameTries = tries;
    });

    this.getAvailableColors();
  }

  submitColors(colors: string[]) {
    this.http.post<SubmitResponse>(this.url + 'submit', {gameId: this.gameId, colors}).subscribe(value => {

      if (value.correct === 4) {
        this.gameState = 2
      } else if (this.gameTries-this.gameHistory.length === 1) {
        this.gameState = 3;
      }

      const entry: HistoryAttempt = {
        ...value,
        colors
      };

      this.gameHistory.push(entry);
    });
  }

  getAvailableColors() {
    this.http.get<string[]>(this.url + 'getAvailableColors').subscribe(value => {
      this.gameColors = value;
    })
  }

  loadGame(id: string) {
    this.getAvailableColors();
    this.http.get<LoadGameResponse>(this.url + 'loadGame?gameId=' + id).subscribe(value => {
      this.gameId = value.id;
      this.gameTries = value.tries;
      this.gameName = value.name;
      this.gameHistory = value.history;
      this.gameState = 1;

    })
  }

}
