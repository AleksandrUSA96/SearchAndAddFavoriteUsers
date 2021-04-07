import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
    flexDirection: {
        flexDirection: 'column',
    },
    favoriteUserItem: {
        cursor: 'pointer',
        display: 'flex',
        direction: 'row',
        alignItems: 'center'
    }
}));