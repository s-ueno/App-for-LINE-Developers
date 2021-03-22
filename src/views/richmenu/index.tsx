

import React from "react";
import {
    Button,
    Grid,
    Link,
    makeStyles,
    TextField,
    Theme,
    Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";


/** css in js(ts)  */
import clsx from "clsx";
import { IRootState } from "../../store/rootModel";
import { UpdateTitle } from "../../store/Layout/action";
const useStyle = makeStyles((theme: Theme) => ({
    center: {
        display: "flex",
        justifyContent: "center"
    },
    input: {
        width: "200px",
        padding: "10px"
    },
    button: {
        width: "200px",
        padding: "10px"
    },
    link: {
        width: "400px",
        padding: "10px"
    }
}));
const Richmenu: React.FC = () => {
    const classes = useStyle();
    const dispatch = useDispatch<any>();
    const account = useSelector((state: IRootState) => state.account);

    dispatch(UpdateTitle("richmenu"));

    return (<>
        <Grid container>

        </Grid>
    </>)
};

export default Richmenu;