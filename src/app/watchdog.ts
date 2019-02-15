import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class Watchdog {
  id: number;
  name: string;
  guarding: string;
  
}
