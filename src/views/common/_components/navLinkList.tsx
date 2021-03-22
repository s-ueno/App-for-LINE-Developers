import React, { useEffect } from "react";
import useMedia from 'use-media';
import {
    Avatar,
    Badge,
    Box,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme,
} from "@material-ui/core";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
/** icons  */
import AppsIcon from '@material-ui/icons/Apps';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { IRootState } from "../../../store/rootModel";

/** css in js(ts)  */
import clsx from "clsx";
const useStyle = makeStyles((theme: Theme) => ({
    root: {
        WebkitFlexGrow: 1,
        flexGrow: 1,
        paddingTop: 0
    },
    linkStyle: {
        color: theme.palette.text.primary,
        background: "transparent",
    },
    unActiveListItem: {
        color: theme.palette.text.primary,
        height: "80px",
        [theme.breakpoints.down("md")]: {
            height: "60px",
        },
    },
    activeListItem: {
        color: "white",
        backgroundColor: "#077bb0 !important",
        paddingLeft: theme.spacing(1)
    },

    unActiveListItemIcon: {
        color: theme.palette.text.primary,
        minWidth: "35px",
        paddingLeft: theme.spacing(1)
    },
    acviveListItemIcon: {
        color: "white",
    },

    unActiveArrow: {
        opacity: 0,
    },
    activeArrow: {
        opacity: 1,
    },
    center: {
        display: "flex",
        WebkitJustifyContent: "center",
        justifyContent: "center",
        WebkitAlignItems: "center",
        alignItems: "center"
    },
    divider: {
        background: theme.palette.text.primary,
        opacity: 0.1
    },

    activeIcon: {
        "&>path": {
            color: theme.palette.text.primary,
        }
    },
    unActiveIcon: {
        fontSize: "1rem",
        "&>path": {
            color: "white",
        }
    },
    avatar: {
        width: "20px",
        height: "20px"
    }
}));

type NavLinkListProps = {
    mobile?: boolean;
}
const NavLinkList: React.FCX<NavLinkListProps> = (props: NavLinkListProps) => {
    const classes = useStyle();
    const accounts = useSelector((state: IRootState) => state.account);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const history = useHistory();

    const { id } = useParams<any>();
    useEffect(() => {
        if (!id) {
            setSelectedIndex(1);
        } else {
            const id = accounts.accounts.map((x, i) => {
                return {
                    selected: x.id === id,
                    index: i + 2
                };
            }).FirstOrDefault(x => x.selected)?.index;
            setSelectedIndex(id ?? 1);
        }
    }, [history.location]);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    function NavLink(props) {
        const { children, to, title, icon, index, ...rest } = props;
        return (
            <Link to={to}
                className={classes.linkStyle}
                style={{ textDecoration: 'none' }}>
                <ListItem button
                    selected={selectedIndex === index}
                    onClick={(event) => handleListItemClick(event, index)}
                    className={clsx(classes.unActiveListItem, selectedIndex === index && classes.activeListItem)}
                >
                    <ListItemIcon className={clsx(classes.unActiveListItemIcon, selectedIndex === index && classes.acviveListItemIcon)} >
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={title} />

                    <ListItemIcon className={clsx(classes.center, classes.unActiveArrow, selectedIndex === index && classes.activeArrow)} >
                        <ArrowForwardIosIcon className={clsx(classes.unActiveIcon, selectedIndex === index && classes.activeIcon)} />
                    </ListItemIcon>
                </ListItem>
                <Divider className={classes.divider} />
            </Link>
        );
    }

    return (<>
        <List component="nav"
            className={clsx(classes.root)}
        >
            <NavLink
                to="/"
                title="channels"
                icon={<AppsIcon fill={"white"} width="20" height="17" />}
                index={1} />
            {accounts.accounts.map((x, index) => {
                return (
                    <NavLink
                        to={`/richmenu?id=${x.id}`}
                        title={x.displayName}
                        icon={<Avatar src={x.pictureUrl} className={classes.avatar} />}
                        index={index + 2} />
                );
            })}
        </List>
    </>)
};

export default NavLinkList;