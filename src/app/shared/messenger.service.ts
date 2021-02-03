import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../modules/product';

@Injectable()
export class MessengerService {
  subject = new Subject();
  constructor() { }
  sendMsg(product: Product) {
    this.subject.next(product); // disparando un evento
  }
  getMsg() {
    return this.subject.asObservable();
  }

}
