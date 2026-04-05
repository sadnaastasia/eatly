import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  getGuestId(): string {
    let guestId = localStorage.getItem('guestId');
    if (!guestId) {
      guestId = uuidv4();
      localStorage.setItem('guestId', guestId);
    }
    return guestId;
  }
}
