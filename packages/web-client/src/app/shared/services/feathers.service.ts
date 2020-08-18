import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

import feathers from '@feathersjs/feathers';
import socketIO from '@feathersjs/socketio-client';

@Injectable({
  providedIn: 'root'
})
export class FeathersService {

  private feathers = feathers();                     // init socket.io
  private socket = io('http://localhost:3030');      // init feathers

  constructor() {
    this.feathers
      .configure(socketIO(this.socket));  // add socket.io plugin
  }

  // expose services
  public service(name: string): any {
    return this.feathers.service(name);
  }
}
