import { useContext } from "react";
import { LoadingContext } from "../../contexts";
import { LoadingStyle } from "./styles";

export function Loading() {
    const { loading } = useContext(LoadingContext);

    return loading ? <LoadingStyle /> : <div></div>;
}
