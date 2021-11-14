import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import NewGameResponse from "../models/NewGameResponse";

@Injectable({
  providedIn: 'root'
})
export class MastermindService {

  constructor(private http: HttpClient) {
  }

  private url = 'http://localhost:5000/game/';

  gameState: number = 0;

  gameId: string | null = null;
  gameName: string | null = null;
  gameColors: string[] = [];

  gameHistory: string[][] = [];

  startGame(name: string, tries: number) {
    this.http.post<NewGameResponse>(this.url + 'start', {name, tries}).subscribe(value => {
      this.gameState = 1;
      this.gameId = value.gameId;
      this.gameName = name;
    });

    this.getAvailableColors();
  }

  submitColors(colors: string[]) {
    this.http.post(this.url + 'submit', {gameId: this.gameId, colors}).subscribe(value => {
      console.log(value);
      this.gameHistory.push([...colors]);
    });
  }

  getAvailableColors() {
    this.http.get<string[]>(this.url + 'getAvailableColors').subscribe(value => {
      this.gameColors = value;
    })
  }

}
