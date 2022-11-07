import { useHistory } from "react-router-dom";

export const useHistorySearch = () => {
    const history = useHistory();
    
    return (pathname, params, state) => {
        //params string or object
        history.push({
          pathname,
          search: new URLSearchParams(params).toString(),
        });
    }
};
