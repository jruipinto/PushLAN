import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-start-icon',
  templateUrl: './start-icon.component.html',
  styleUrls: ['./start-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartIconComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
