import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// slices
import homeReducer from "./slices/home/home";
import companyJobReducer from "./slices/job/company";
import customerJobReducer from "./slices/job/customer";
import driverJobReducer from "./slices/job/driver";
// ----------------------------------------------------------------------

export const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

export const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

export const driverJobPersistConfig = {
  key: "driverJob",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

export const customerJobPersistConfig = {
  key: "customerJob",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};
export const companyJobPersistConfig = {
  key: "companyJob",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};
export const homeTotalJobPersistConfig = {
  key: "home",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  driverJob: persistReducer(driverJobPersistConfig, driverJobReducer),
  customerJob: persistReducer(customerJobPersistConfig, customerJobReducer),
  companyJob: persistReducer(companyJobPersistConfig, companyJobReducer),
  home: persistReducer(homeTotalJobPersistConfig, homeReducer),
});

export default rootReducer;
