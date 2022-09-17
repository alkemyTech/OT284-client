import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/core/services/message.service';
import { AboutService } from '../../core/services/about.service';

@Injectable()
export class OrganizationEffects {

  loadOrganization$ = createEffect(() => this.actions$.pipe(
    ofType('[Organization View] Load organization'),
    mergeMap(() => this.aboutService.getOrganization()
      .pipe(
        map(organization => ({ type: '[Organization View] Load success', organization })),
        catchError(() => of({ type: '[Organization View] Load failed' }))
      ))
  )
  );

  handleOrganizationError = createEffect(() =>
    this.actions$.pipe(
      ofType('[Organization View] Load failed'),
      tap(() => {
        this.messageService.add("No se han podido cargar los datos de la organizacion");
      })
    ),
    { dispatch: false }
  )

  loadMembers$ = createEffect(() => this.actions$.pipe(
    ofType('[Organization View] Load members'),
    mergeMap(() => this.aboutService.getMembers()
      .pipe(
        map(members => ({ type: '[Organization View] Loaded members success', members })),
        catchError(() => of({ type: '[Organization View] Load members failed' }))
      ))
  )
  );

  handleMembers = createEffect(() =>
    this.actions$.pipe(
      ofType('[Organization View] Load members failed'),
      tap(() => {
        this.messageService.add("No se han podido cargar los datos de los miembros");
      })
    ),
    { dispatch: false }
  )

  constructor(
    private actions$: Actions,
    private aboutService: AboutService,
    private messageService: MessageService
  ) { }
}