export const DEFAULT_PRICING = "DEFAULT_PRICING";
export const ALLOW_BOOKING_FOR_UNREGISTERED_USER =
  "ALLOW_BOOKING_FOR_UNREGISTERED_USER";
export const LOGIN_CUTOFF_TIME = "LOGIN_CUTOFF_TIME";
export const LOGOUT_CUTOFF_TIME = "LOGOUT_CUTOFF_TIME";
export const MAGICNUMBERS = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
};

export const CANCEL_CUTOFF_TIME = "CANCEL_CUTOFF_TIME";
export const MODIFY_CUTOFF_TIME = "MODIFY_CUTOFF_TIME";
export const LocationAllowedEpsilon = 1e-7;
export const MAX_SYNC_REQUESTS = 80;

export const DEPOT_LOCATION = {
  latitude: 13.094725,
  longitude: 80.1677118,
};

export const LEANSHIFT_START_THRESHOLD = 1000;
export const MAX_ROUTING_ATTEMPTS = 20;
export const LEANSHIFT_ACCEPTANCE_DELTA = 5;
export const TELEMATICS = {
  TELEMATICS_ERROR: "TELEMATICS_ERROR",
};

export interface ResponseStructure {
  errors: Array<string>;
  response: string;
}
