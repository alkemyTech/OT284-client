import { createAction, props } from '@ngrx/store';
import { Organization } from '../../shared/interfaces/organization';

export const loadOrganization = createAction(
  '[Organization View] Load organization'
);

export const loadedOrganization = createAction(
    '[Organization View] Load success',
    props<{organization: Organization}>()
); 