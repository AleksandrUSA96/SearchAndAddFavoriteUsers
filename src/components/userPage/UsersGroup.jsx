import React from "react";
import UserItem from "./UserItem";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    flexDirection: {
        flexDirection: 'column',
    }
}));

let UsersGroup = React.memo(({group, index}) => {
    const classes = useStyles();

    return (
        <Accordion TransitionProps={{ unmountOnExit: true }}>
            <Typography variant="subtitle1" color="textPrimary">
            <AccordionSummary>
                Группа пользователей от -- до --
            </AccordionSummary>
            </Typography>
            <AccordionDetails className={classes.flexDirection}>
            {
                group.map(user => <UserItem user={user}
                                            key={user.login.uuid}
                                            index={index}

                />)
            }
            </AccordionDetails>
        </Accordion>
    )
});


export default UsersGroup;