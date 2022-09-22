import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { NewsMembersService } from 'src/app/core/services/news-members.service';

@Injectable()
export class MembersEffects {

  loadMembers$ = createEffect(() => this.actions$.pipe(
    ofType('[Members] Load members'),
    mergeMap( (search) => this.newsMembersService.getMembers(search)
        .pipe(
            map(members => ({type: '[Members] Loaded success', members})),
            catchError(() => EMPTY)
        )
    )
    )
  );

  deleteMember$ = createEffect(() => this.actions$.pipe(
    ofType('[Member Delete] Deleting Member'),
    mergeMap((action: any) => this.newsMembersService.deleteMember(action.id)
      .pipe(
        map(() => ({ type: '[Member Delete] Delete success' })),
        catchError(() => EMPTY)
      )
    )
  ));

  createMember$ = createEffect(() => this.actions$.pipe(
    ofType('[Member Create] Creating Member'),
    mergeMap((action: any) => this.newsMembersService.postMembers(action.member)
      .pipe(
        map(() => ({ type: '[Member Create] Create success' })),
        catchError(() => EMPTY)
      ))
    )
  );

  loadMember$ = createEffect(() => this.actions$.pipe(
    ofType('[Member Form] Get Member by id'),
    mergeMap((action: any) => this.newsMembersService.getMember(action.id)
      .pipe(
        map((member) => ({ type: '[Member Form] Get Member by id success', member })),
        catchError(() => EMPTY)
      ))
    )
  );

  updateMember$ = createEffect(() => this.actions$.pipe(
    ofType('[Member Edit] Editing Member'),
    mergeMap((action: any) => this.newsMembersService.putMember(action.id, action.member)
      .pipe(
        map(() => ({ type: '[Member Edit] Edit success' })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private newsMembersService: NewsMembersService,
  ) {}
}