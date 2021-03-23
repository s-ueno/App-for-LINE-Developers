import { richMenuObject } from "../../../models/richMenuObject";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/rootModel";
import { useRichmenuObject } from "./useRichmenuObject";

export function useRichmenuAdd() {
    const add = () => {
        const uuid = uuidv4();
        const newMenu : richMenuObject = {
            richMenuId: `menu-${uuid}`,
            size: {
                width: 0 , height : 0
            },
            selected : false,
            name:"",
            chatBarText : "",
            areas: []
        };
        return newMenu;
    };
    return add;
}