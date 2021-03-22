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
import { UpdateTitle } from "../../../store/Layout/action";
/** css in js(ts)  */
import clsx from "clsx";
import AddChannel from "../_compornents/addChannel";
import { IRootState } from "../../../store/rootModel";
import ChannelCard from "../_compornents/channelCard";
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
const Home: React.FC = () => {
    const classes = useStyle();
    const dispatch = useDispatch<any>();
    const account = useSelector((state: IRootState) => state.account);

    dispatch(UpdateTitle("channels"));

    return (<>
        <Grid container>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <AddChannel />
            </Grid>

            {account.accounts.map(x => {
                return (
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                        <ChannelCard {...x} />
                    </Grid>
                );
            })}
        </Grid>
    </>)
};

export default Home;