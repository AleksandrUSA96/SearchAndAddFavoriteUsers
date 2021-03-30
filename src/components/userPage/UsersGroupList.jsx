import React from "react";
import {Box} from "@material-ui/core";
import UsersGroup from "./UsersGroup";

let UsersGroupList = ({usersGroup}) => {
    return (
        <>
            <Box width="50%">
                {
                    usersGroup.map((groupObject, index) => <UsersGroup groupObject={groupObject}
                                                                       key={index}
                    />)
                }
            </Box>
        </>
    )
};

export default UsersGroupList;