import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { NumberSumStore } from "../../features/number-sum/store/number-sum.store";

export const gameConfiguredGuard: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(NumberSumStore);

  
  if (store.hasConfig()) {
    return true; 
  }

 
  return router.createUrlTree(['/games/number-sum/setup']);
};