import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { authReducer } from "@/lib/features/auth/authSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { umkmReducer } from "../features/umkm/umkmSlice";
import { wisataReducer } from "../features/wisata/wisataSlice";
import { budayaReducer } from "../features/budaya/budayaSlice";
import { peternakanReducer } from "../features/peternakan/peternakanSlice";

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["isAuthenticated", "user", "token"],
};

const umkmPersistConfig = {
  key: "umkm",
  storage: storage,
  whitelist: ["umkm"],
};

const wisataPersistConfig = {
  key: "wisata",
  storage: storage,
  whitelist: ["wisata"],
};

const budayaPersistConfig = {
  key: "budaya",
  storage: storage,
  whitelist: ["budaya"],
};

const peternakanPersistConfig = {
  key: "peternakan",
  storage: storage,
  whitelist: ["peternakan"],
};

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  umkm: persistReducer(umkmPersistConfig, umkmReducer),
  wisata: persistReducer(wisataPersistConfig, wisataReducer),
  budaya: persistReducer(budayaPersistConfig, budayaReducer),
  peternakan: persistReducer(peternakanPersistConfig, peternakanReducer),
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "auth/logout") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
