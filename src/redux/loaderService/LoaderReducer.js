import { LOADER_CONSTANTS } from './LoaderConstants';

const initialState = {
  loaderService: false,
};

export default function loaderReducer(state = initialState, action) {
  switch (action.type) {
    case LOADER_CONSTANTS.LOADER_START_SUCCESS:
      return {
        ...state,
        loaderService: true,
      };
    case LOADER_CONSTANTS.LOADER_STOP_SUCCESS:
      return {
        ...state,
        loaderService: false,
      };
    default:
      return { ...state };
  }
}
