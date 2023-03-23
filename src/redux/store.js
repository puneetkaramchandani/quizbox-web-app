import thunk from "redux-thunk";
import rootreducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "common",
  storage,
  whitelist: ["user", "common"],
};

const persistedReducer = persistReducer(persistConfig, rootreducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
});

const persister = persistStore(store);

const dispatch = (action) => {
  if (store != undefined) {
    return store.dispatch(action);
  }
};

export { store, persister, dispatch };
