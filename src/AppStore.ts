import { createStore, applyMiddleware, Store } from "redux";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from "redux-thunk";
import { createLogger } from 'redux-logger';
import rootReducers from "./store/rootReducers";

// 永続化の設定
const persistConfig = {
    key: 'root',
    storage,
    /** localstorage に状態保存をしてもよいというホワイトリスト */
    whitelist: ["customTheme", "account"]
}
const persistedReducer = persistReducer(persistConfig, rootReducers)
const logger = createLogger({
    diff: true,
    collapsed: true,
})
const store: Store = createStore(persistedReducer, applyMiddleware(
    thunkMiddleware,
    logger
));
store.subscribe(() => {

});
export const persistor = persistStore(store);
export default store;