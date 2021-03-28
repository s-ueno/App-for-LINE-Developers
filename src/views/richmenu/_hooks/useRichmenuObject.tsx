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
import { useQueryId } from "./useQueryId";

export function useRichmenuObject(account: IAccountHeader) {
    const dispatch = useDispatch();
    const [id, _] = useQueryId();
    const channel = useSelector((state: IRootState) => state.channel);
    const webServiceAsync = useGenericWebServiceAsync();

    useAsyncEffect(async (isMounted) => {
        if (!isMounted()) return;
        if (!account) return;
        if (String.IsNullOrWhiteSpace(id)) return;

        const result = await webServiceAsync<any, {
            defaultRichmenuId: string,
            richmenus: richMenuObject[]
        }>(
            "api/listRichmenus", { token: account.token });

        if (result) {
            result.richmenus.forEach(each => {
                each.areas = each.areas.map(x => {
                    x.identity = uuidv4();
                    return x;
                });
            });
            const newChannel: IChannel = {
                token: account.token,
                defaultRichmenuId: result.defaultRichmenuId,
                richmenus: result.richmenus
            };
            dispatch(UpdateChannel(newChannel));
        }
    }, [id]);

    const setRichmenuObject = (richmenu: richMenuObject) => {
        const newRichmenus = channel.richmenus.map(x => {
            if (x.richMenuId === richmenu.richMenuId) {
                return richmenu;
            }
            return x;
        });
        const newChannel: IChannel = {
            token: account.token,
            defaultRichmenuId: channel.defaultRichmenuId,
            richmenus: newRichmenus
        };
        dispatch(UpdateChannel(newChannel));
    };

    const addRichmenuObject = () => {
        const newMenu = {
            richMenuId: "",
            index: channel.richmenus.length,
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
            defaultRichmenuId: channel.defaultRichmenuId,
            richmenus: [...channel.richmenus, newMenu]
        };
        dispatch(UpdateChannel(newChannel));
        setTimeout(() => {
            const end = document.getElementById(`richmenu-${newChannel.richmenus.length - 1}`);
            end?.scrollIntoView({ behavior: "smooth", block: "end" });
        }, 300)
        return newChannel.richmenus.length - 1;
    };

    return { channel, setRichmenuObject, addRichmenuObject };
}