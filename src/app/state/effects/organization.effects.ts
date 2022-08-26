import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AboutService } from '../../core/services/about.service';

@Injectable()
export class OrganizationEffects {

  loadOrganization$ = createEffect(() => this.actions$.pipe(
    ofType('[Organization View] Load organization'),
    mergeMap(() => this.aboutService.getOrganization()
      .pipe(
        map(organization => ({ type: '[Organization View] Load success', organization })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private aboutService: AboutService
  ) {}
}