import ActionTypes from './ActionTypes';

export interface IAction {
  type: ActionTypes;
  payload: any;
}
