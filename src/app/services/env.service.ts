import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  // API_URL = 'http://fypira.test/'; //local
  API_URL = 'https://fypira.webkelia.com/'; //live

  constructor() { }
}
