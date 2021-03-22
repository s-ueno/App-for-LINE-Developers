import React from "react";
import { useTranslation } from 'react-i18next';
import clsx from "clsx";
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    makeStyles,
    Theme,
    Typography
} from "@material-ui/core";
import { useHistory } from "react-router";

const useStyle = makeStyles((theme: Theme) => ({
    root: {
        height: "300px",
        padding: theme.spacing(2)
    },
    actionArea: {
        height: "100%"
    },
    wh100: {
        width: "100%",
        height: "100%"
    },
    flex: {
        display: "flex"
    },
    avatar: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
    subTitle: {
        padding: "10px"
    }
}));
type Props = {
    token: string;
    id: string;
    displayName: string;
    pictureUrl: string;
}
const ChannelCard: React.FCX<Props> = (props) => {
    const { className, id, displayName, pictureUrl, ...rest } = props;
    const classes = useStyle();
    const history = useHistory();
    function open() {
        history.push(`/richmenu?id=${id}`);
    }
    return (<div className={clsx(classes.root)}>
        <Card className={clsx(classes.actionArea, className)} variant="outlined">
            <CardActionArea
                className={clsx(classes.actionArea)}
                onClick={e => open()}
            >
                <Grid container className={classes.wh100}>
                    <Grid item className={clsx(classes.wh100, classes.flex)}
                        justify="center" alignItems="center">
                        <Grid container>
                            <Grid item xs={12}
                                className={clsx(classes.flex)}
                                justify="center" alignItems="center">
                                <Avatar src={pictureUrl} className={classes.avatar} />
                            </Grid>
                            <Grid item xs={12}
                                className={clsx(classes.flex)}
                                justify="center" alignItems="center">
                                <Typography variant="h6">
                                    {displayName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}
                                className={clsx(classes.flex)}
                                justify="center" alignItems="center">
                                <Typography variant="caption" className={classes.subTitle}>
                                    {id}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    </div>);
}
export default ChannelCard;