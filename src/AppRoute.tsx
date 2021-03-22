import React, { useEffect } from 'react';
import { Route } from 'react-router';
import { Switch } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import history from './history';
import {
    makeStyles,
    CircularProgress,
    Backdrop,
} from "@material-ui/core";
import { isIE } from 'react-device-detect';
import { useSelector } from 'react-redux';

/* 業務固有のimport */
import { IRootState } from './store/rootModel';
import NotSupport from './views/specialCase/notSupport';
import NotFound from './views/specialCase/notFound';
import Home from './views/dahsbord/home';
import Richmenu from './views/richmenu';

/** css in js(ts)  */
const cssInCode = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const AppRoute: React.FC = () => {
    const css = cssInCode();


    /* IEで画面起動しようとした場合は、使えない旨を示す */
    if (isIE) {
        return (<NotSupport />);
    }

    return (
        <div>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path='/'>
                        <Home />
                    </Route>
                    <Route path='/richmenu?:id'>
                        <Richmenu key={window.location.pathname} />
                    </Route>


                    { /* URL違う場合 */}
                    <Route exact path='*'>
                        <NotFound />
                    </Route>
                </Switch>
            </ConnectedRouter>
        </div>
    );
};

export default AppRoute;