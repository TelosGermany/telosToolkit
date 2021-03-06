import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
// TODO: Change icon and rename
import TelosGermanyIcon from 'assets/img/telosGermany.png';

const style = {
  logoMini: {
    transition: 'all 300ms linear',
    opacity: 1,
    float: 'left',
    textAlign: 'center',
    width: '25px',
    display: 'inline-block',
    maxHeight: '25px',
    // marginLeft: '22px',
    marginRight: '20px',
    marginTop: '4px',
    color: 'inherit',
  },
  img: {
    width: '30px',
    verticalAlign: 'middle',
    border: '0',
  },
}

const Icon = (props) => {
  const {classes} = props;
  return (<div className={classes.logoMini}><img src={TelosGermanyIcon} className={classes.img}/></div>);
};

export default withStyles(style)(Icon);
