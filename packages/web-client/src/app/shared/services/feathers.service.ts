import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import feathers from '@feathersjs/feathers';
import socketIO from '@feathersjs/socketio-client';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeathersService {

  private feathers = feathers();                     // init socket.io
  private socket = io(environment.apiURL);      // init feathers

  constructor() {
    this.feathers
      .configure(socketIO(this.socket));  // add socket.io plugin
  }

  // expose services
  public service(name: string): any {
    return this.feathers.service(name);
  }
}
