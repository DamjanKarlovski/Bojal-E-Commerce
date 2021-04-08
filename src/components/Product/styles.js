import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
root: {
    maxWidth: '100%',
    height: '100%',
    position: 'relative'
},
media: {
    height: 0,
    paddingTop: '56.25%'
},
cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: '1px',
    right: '1px'
},
cardContent: {
    display: 'flex',
    justifyContent: 'space-between'
}


}))