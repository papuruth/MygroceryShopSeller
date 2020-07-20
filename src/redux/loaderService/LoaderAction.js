const { LOADER_CONSTANTS } = require('./LoaderConstants');

export const loaderStartAction = () => ({
  type: LOADER_CONSTANTS.LOADER_START_REQUEST,
});

export const loaderStopAction = () => ({
  type: LOADER_CONSTANTS.LOADER_STOP_REQUEST,
});
