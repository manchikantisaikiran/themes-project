import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() {
  }

  isLoggedIn: BehaviorSubject<string> = new BehaviorSubject('');

}
