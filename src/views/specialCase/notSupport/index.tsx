import React from "react";
import clsx from "clsx";
import {
    makeStyles,
    Grid,
    Typography,
} from '@material-ui/core';

const cssInCode = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        marginTop: "60px",
    },
    titleGrid: {
        marginTop: "40px",
    },
    title: {
        display: "inline-block",
        fontWeight: "bold",
        color: "dimgray",
    },
    sentenseGrid: {
        margin: "20px 0 5px 0",
    },
    sentense: {
        color: "gray",
        display: "inline-block",
    },
    whiteFrame: {
        backgroundColor: "white",
        WebkitBorderRadius: "10px",
        borderRadius: "10px",
        padding: "20px 35px",
        color: "gray",
        margin: "15px auto",
        width: "450px"
    },
    recommendedEnvironmentMT: {
        margin: "10px 0 0 0",
    },
    mZero: {
        margin: "0",
    },
    recommendedEnvironmentMB: {
        margin: "0 0 8px 0",
    },
    w100: {
        width: "100%",
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
}));

const NotSupport: React.FC = () => {
    const classes = cssInCode();

    return (
        <div>
            < div className={classes.root} >
                <div className={classes.bg} />
                <Grid container className={classes.titleGrid}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="h4" component="span" className={classes.title}>
                            このブラウザは
                    </Typography>
                        <Typography variant="h4" component="span" className={classes.title}>
                            現在サポートされていません
                    </Typography>
                    </Grid>
                </Grid>

                <Grid container className={classes.sentenseGrid}>
                    <Grid item xs={12} sm={12} md={12} className={classes.sentense}>
                        <Typography>
                            サポートされているブラウザに切り替えてご利用ください。
                    </Typography>
                    </Grid>
                </Grid>
            </div >

            <Grid container className={classes.whiteFrame}>
                <Grid item xs={12} sm={12} md={12}>
                    <div className={classes.w100}>
                        <Typography className={clsx(classes.recommendedEnvironmentMB)}>OS・ブラウザ</Typography>
                        <Typography className={classes.mZero}>Windows 8.1以上</Typography>
                        <ul className={classes.mZero}>
                            <li>Google Chrome最新版</li>
                            <li>Microsoft Edge最新版（Windows10の場合）</li>
                        </ul>
                        <Typography className={classes.recommendedEnvironmentMT}>macOS10.15以上</Typography>
                        <ul className={classes.mZero}>
                            <li>Safari 最新版</li>
                            <li>Google Chrome最新版</li>
                        </ul>
                    </div>
                </Grid>
            </Grid>


        </div>
    );
};

export default NotSupport;