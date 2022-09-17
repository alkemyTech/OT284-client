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


  constructor(
    private actions$: Actions,
    private newsMembersService: NewsMembersService,
  ) {}
}