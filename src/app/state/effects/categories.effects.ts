import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { NewsCategoriesService } from '../../core/services/news-categories.service';

@Injectable()
export class CategoriesEffects {

  loadCategories$ = createEffect(() => this.actions$.pipe(
    ofType('[Categories View] Load categories'),
    mergeMap(() => this.categoryService.getCategories()
      .pipe(
        map(categories => ({ type: '[Categories View] Load success', categories })),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteCategory$ = createEffect(() => this.actions$.pipe(
    ofType('[Category Delete] Deleting category'),
    mergeMap((action: any) => this.categoryService.deleteCategory(action.id)
      .pipe(
        map(() => ({ type: '[Category Delete] Delete success' })),
        catchError(() => EMPTY)
      ))
    )
  );

  createCategory$ = createEffect(() => this.actions$.pipe(
    ofType('[Category Create] Creating category'),
    mergeMap((action: any) => this.categoryService.createCategory(action.category)
      .pipe(
        map(() => ({ type: '[Category Create] Create success' })),
        catchError(() => EMPTY)
      ))
    )
  );

  loadCategory$ = createEffect(() => this.actions$.pipe(
    ofType('[Category Form] Get Category by id'),
    mergeMap((action: any) => this.categoryService.getCategoryById(action.id)
      .pipe(
        map((category) => ({ type: '[Category Form] Get Category by id success', category })),
        catchError(() => EMPTY)
      ))
    )
  );

  updateCategory$ = createEffect(() => this.actions$.pipe(
    ofType('[Category Edit] Editing category'),
    mergeMap((action: any) => this.categoryService.updateCategory(action.id, action.category)
      .pipe(
        map(() => ({ type: '[Category Edit] Edit success' })),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private categoryService: NewsCategoriesService
  ) {}
}