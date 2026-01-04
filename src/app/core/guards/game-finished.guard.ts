import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { GameService } from "../services/game/game.service";

export const gameFinishedGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const game = inject(GameService);
  const fallback = route.data['setupPath'] || '/';

  return game.hasResult() ? true : router.createUrlTree([fallback]);
};