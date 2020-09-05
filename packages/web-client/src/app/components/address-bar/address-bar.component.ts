import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-address-bar',
  templateUrl: './address-bar.component.html',
  styleUrls: ['./address-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
