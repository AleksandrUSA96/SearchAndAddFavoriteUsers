import React from "react";

export const UserContext = React.createContext();

const Provider = (props) => {
    return <UserContext.Provider value={{
        transmittedUser: null,
        transmittedIndexGroup: null,
        dragStartHandler: (e, user, usersGroup, transmittedUser, transmittedIndexGroup) => {
            transmittedUser = user;
            transmittedIndexGroup = usersGroup;
            console.log(transmittedUser);
        }
    }}>
        {props.children}
    </UserContext.Provider>
}

export default Provider;