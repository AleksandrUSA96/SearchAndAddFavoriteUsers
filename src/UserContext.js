import React from "react";

export const UserContext = React.createContext({
    transmittedUser: {},
    transferUser: (e, transmittedUser) => {
        transmittedUser = e
        console.log(transmittedUser)
    }
});

const Provider = (props) => {
    console.log(props)
    return <UserContext.Provider value={props}>
        {props.children}
    </UserContext.Provider>
}

export default Provider;