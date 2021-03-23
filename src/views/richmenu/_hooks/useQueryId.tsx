import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useQueryString } from "../../../hooks/useQueryString";
import { Location} from "history";

export function useQueryId() : [string | null, Location<any>]  {
    const histroy = useHistory();
    const queryString = useQueryString();
    const [id, setId] = useState(queryString("id"));
    const [location, setLocation] = useState(histroy.location);

    useEffect(() => {
        setId(queryString("id"));
        setLocation(histroy.location);
    }, [histroy.location]);

    return [id, location] ;
}