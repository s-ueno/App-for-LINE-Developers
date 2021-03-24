import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import useAsyncEffect from "use-async-effect";
import { v4 as uuidv4 } from 'uuid';
import { useGenericWebServiceAsync } from "../../../hooks/useGenericWebServiceAsync";
import { richMenuObject } from "../../../models/richMenuObject";
import { UpdateChannel } from "../../../store/Account/action";
import { IAccountHeader, IChannel } from "../../../store/Account/model";
import { IRootState } from "../../../store/rootModel";
import { useAccount } from "./useAccount";

export function useRichmenuObject(account: IAccountHeader) {
    const histroy = useHistory();
    const dispatch = useDispatch();
    const channel = useSelector((state: IRootState) => state.channel);
    const webServiceAsync = useGenericWebServiceAsync();

    useAsyncEffect(async () => {
        const result = await webServiceAsync<any, { richmenus: richMenuObject[] }>(
            "api/listRichmenus", { token: account.token });
        if (result) {
            const newChannel: IChannel = {
                token: account.token,
                richmenus: result.richmenus
            };
            dispatch(UpdateChannel(newChannel));
        }
    }, [histroy.location, account]);

    const setRichmenuObject = (richmenu: richMenuObject) => {
        const newRichmenus = channel.richmenus.map(x => {
            if (x.richMenuId === richmenu.richMenuId) {
                return richmenu;
            }
            return x;
        });
        const newChannel: IChannel = {
            token: account.token,
            richmenus: newRichmenus
        };
        dispatch(UpdateChannel(newChannel));
    };

    const addRichmenuObject = () => {
        const uuid = uuidv4();
        const newMenu: richMenuObject = {
            richMenuId: `menu-${uuid}`,
            size: {
                width: 0, height: 0
            },
            selected: false,
            name: "",
            chatBarText: "",
            areas: []
        };
        const newChannel: IChannel = {
            token: account.token,
            richmenus: [...channel.richmenus, newMenu]
        };
        dispatch(UpdateChannel(newChannel));
    };

    return { channel, setRichmenuObject, addRichmenuObject };
}