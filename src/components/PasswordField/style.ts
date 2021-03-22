import { Theme } from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles';

const style: Styles<Theme, {}> = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
});

export default style;
