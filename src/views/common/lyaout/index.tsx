import React, { useEffect } from "react";
import {
    Hidden
} from '@material-ui/core';
import { useDispatch } from "react-redux";
import LayoutPC from "./indexPC";
import LayoutMobile from "./indexMobile";
const Layout: React.FC = (props) => {
    const { children, ...rest } = props;
    return (<>
        { /* smより小さくなった場合に非表示 ≒　PCサイズの場合 */}
        <Hidden smDown implementation="css">
            <LayoutPC>{children}</LayoutPC>
        </Hidden>
        { /* mdより大きくなった場合に非表示 ≒　スマフォサイズの場合 */}
        <Hidden mdUp implementation="css">
            <LayoutMobile>{children}</LayoutMobile>
        </Hidden>
    </>)
};

export default Layout;