import { createContext } from "react";

let userContext = createContext({
    user: {
        username:"empty user",
    }
});

export default userContext;