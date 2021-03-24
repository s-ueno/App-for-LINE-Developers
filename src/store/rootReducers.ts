import { combineReducers, Reducer } from "redux";
import { connectRouter } from 'connected-react-router';
import history from '../history';

import { IRootState } from './rootModel';
import { overlayReducer } from './Overlay/reducer';
import { themeReducer } from './Theme/reducer';
import { titleReducer } from './Layout/reducer';
import { drawerReducer } from './SideDrawer/reducer';
import { accontReducer, channelReducer } from './Account/reducer';

/** 全てのReducer(※仮想DOMにバインドを登録する。メディエーターのようなもの) */
const rootReducers: Reducer<IRootState> = combineReducers({
    router: connectRouter(history),
    overlay: overlayReducer,
    customTheme: themeReducer,
    title: titleReducer,
    drawer: drawerReducer,
    account: accontReducer,
    channel: channelReducer
});

export default rootReducers;