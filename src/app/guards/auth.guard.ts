import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@app/services/storage.service';

export const authGuard: CanActivateFn = () => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const token = storage.token;
  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
