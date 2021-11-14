import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MastermindService} from "../../services/mastermind.service";

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: MastermindService) { }

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['name', [Validators.required]],
      tries: [6, [Validators.required, Validators.max(12), Validators.min(6)]]
    });

  }

  startGame() {
    if (!this.formGroup.valid) return;
    this.service.startGame(this.formGroup.value.name, this.formGroup.value.tries);
  }
}
