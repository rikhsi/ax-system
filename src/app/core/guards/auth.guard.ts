import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RedirectService, StorageService } from '../services';

export const authGuard: CanActivateFn = () => {
  const storage = inject(StorageService).getAccessToken();

  if(!storage) {
    inject(RedirectService).navigateOnLogout();

    return false
  }

  return true;
};
