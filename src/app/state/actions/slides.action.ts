import { createAction, props } from '@ngrx/store';
import { Slides } from 'src/app/shared/interfaces/slides';

export const loadSlides = createAction(
    '[Slides List] Load slides',
    props<{ parameters: string }>()
);

export const loadedSlides = createAction(
    '[Slides List] Load slides success',
    props<{ slides: Slides[] }>()
);
