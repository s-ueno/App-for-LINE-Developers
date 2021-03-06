export type richMenuObject = {
    richMenuId: string;
    size: {
        width: number;
        height: number;
    };
    postScale?: {
        scaleX: number;
        scaleY: number;
    };
    selected: boolean;
    name: string;
    chatBarText: string;
    areas: area[];
}

export type area = {
    identity: string;
    bounds: bounds;
    action: postbackAction | messageAction | uriAction;
}
export type bounds = {
    x: number;
    y: number;
    width: number;
    height: number;
}
export type postbackAction = {
    type: "postback";
    data: string;
    label: string;
    displayText?: string;
}
export type messageAction = {
    type: "message";
    label: string;
    text: string;
}
export type uriAction = {
    type: "uri";
    label: string;
    uri: string;
}
export type actionType = "postback" | "message" | "uri";
