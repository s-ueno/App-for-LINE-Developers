import React from "react";
import {
    makeStyles,
    Grid,
    Button,
} from '@material-ui/core';

/** css in js(ts)  */
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { UpdateTitle } from "../../../store/Layout/action";
const cssInCode = makeStyles((theme) => ({
    root: {
        height: "calc(100vh - 60px)",
        width: "100%",
        display: "flex",
        WebkitJustifyContent: "center",
        justifyContent: "center",
        WebkitAlignItems: "center",
        alignItems: "center",
        padding: 50,

        [theme.breakpoints.down("sm")]: {
            padding: 15,
        }
    },
    bg: {
        backgroundImage: 'url(https://source.unsplash.com/daily?sad)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        WebkitBackgroundSize: 'cover',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0.2,
        width: "100%",
        height: "100%",
    },
    title: {
        fontSize: "5rem",
    },
    subTitle: {
        fontSize: "2rem",
    },
    button: {
        marginTop: 50,
        [theme.breakpoints.down("sm")]: {
            marginTop: 5,
        }
    },
}));



const NotFound: React.FC = () => {
    const classes = cssInCode();
    const dispatch = useDispatch<any>();
    dispatch(UpdateTitle("olz"));

    return (
        <Grid container className={clsx(classes.root)}>
            <Grid item xs={12}>
                <div className={classes.bg} />
                <span
                    className={classes.title}
                >
                    Whoops!
                </span>
                <div>
                    <span
                        className={classes.subTitle}
                    >
                        404 Page not found
                    </span>
                </div>
                <div>
                    <Button
                        className={classes.button}
                        variant="outlined"
                        href="/"
                    >
                        Go back home
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
};

export default NotFound;