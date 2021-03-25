import { useDispatch } from "react-redux";
import { area, richMenuObject } from "../../../models/richMenuObject";
import { UpdateChannel } from "../../../store/Account/action";
import { IChannel } from "../../../store/Account/model";



export function useUpdateAction() {
    const dispatch = useDispatch();
    const addAction = (channel: IChannel, richmenu: richMenuObject) => {
        const newArea: area = {
            bounds: {
                x: 0, y: 0, width: 0, height: 0
            },
            action: {
                type: "message",
                label: "",
                text: ""
            }
        };
        const newChannel = {
            ...channel,
            richmenu: {
                ...richmenu,
                areas: [...richmenu.areas, newArea]
            }
        }
        dispatch(UpdateChannel(newChannel));
    };
    const deleteAction = (channel: IChannel, richmenu: richMenuObject, index: number) => {
        const newChannel = {
            ...channel,
            richmenu: {
                ...richmenu,
                areas: richmenu.areas.filter((x, i) => i !== index)
            }
        };
        dispatch(UpdateChannel(newChannel));
    }

    return { addAction, deleteAction };
}