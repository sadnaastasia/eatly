import { HttpInterceptorFn } from '@angular/common/http';
import { GuestService } from './guest.service';
import { inject } from '@angular/core';

export const guestInterceptor: HttpInterceptorFn = (req, next) => {
  const guestService = inject(GuestService);
  req = req.clone({
    setHeaders: {
      'x-guest-id': guestService.getGuestId(),
    },
  });
  return next(req);
};
