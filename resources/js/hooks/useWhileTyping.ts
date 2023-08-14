import { useEffect } from "react";
import { WATI_TIME_FOR_SEARCH } from "../Config/constants";

const useWhileTyping = (callback: () => void, tracking: boolean, deps: any[]) => {
    useEffect(() => {
        let waiting: number | null = null;
        if (tracking) {
            waiting = setTimeout(() => {
                callback();
            }, WATI_TIME_FOR_SEARCH);
        }
        return () => {
            if (waiting !== null)
                clearTimeout(waiting);

        }
    }, [...deps]);
};

export default useWhileTyping;
