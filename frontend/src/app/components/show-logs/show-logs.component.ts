import { Component, OnInit } from '@angular/core';
import {MastermindService} from "../../services/mastermind.service";

@Component({
  selector: 'app-show-logs',
  templateUrl: './show-logs.component.html',
  styleUrls: ['./show-logs.component.scss']
})
export class ShowLogsComponent implements OnInit {

  constructor(public service: MastermindService) { }

  logs: string[] = [];

  ngOnInit(): void {
    this.service.onHttpRequest.subscribe(value => {
      this.logs.push(value)
    })
  }

}
