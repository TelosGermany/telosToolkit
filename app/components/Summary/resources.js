import React from 'react';
import { NavLink } from 'react-router-dom';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import tableStyle from 'assets/jss/tableStyle';

function ResourcesTable({ ...props }) {
  const { classes, account, network } = props;

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {account ? (
          <TableBody>
            <TableRow className={`${classes.tableRowHover}`}>
              <TableCell className={classes.tableCell}>
                <h6>{network.network.prefix}</h6>
              </TableCell>
              <TableCell className={classes.tableCell}>
                {account.balances !== undefined && account.balances.length >= 1
                  ? account.balances[0].split(' ')[0]
                  : 'None'}
              </TableCell>
              <TableCell className={classes.tableCell}>
                <h6>RAM</h6>
              </TableCell>
              <TableCell className={classes.tableCell}>
                {account.ram_usage} bytes used<br />
                {account.ram_quota} bytes owned
              </TableCell>
              <TableCell className={classes.tableCell}>
                <h6>CPU</h6>
              </TableCell>
              <TableCell className={classes.tableCell}>
                {account.total_resources.cpu_weight}
                <br />({Number((account.cpu_limit.used / account.cpu_limit.max) * 100).toFixed(2)} % used)
              </TableCell>
              <TableCell className={classes.tableCell}>
                <h6>NET</h6>
              </TableCell>
              <TableCell className={classes.tableCell}>
                {account.total_resources.net_weight}
                <br />({Number((account.net_limit.used / account.net_limit.max) * 100).toFixed(2)} % used)
              </TableCell>
              <TableCell className={classes.tableCell}>
                <h6>REFUNDING</h6>
              </TableCell>
              <TableCell className={classes.tableCell}>
                {account && account.refund_request ? (
                  <span>
                    CPU: {account.refund_request.cpu_amount}
                    <br />NET: {account.refund_request.net_amount}
                  </span>
                ) : (
                  <span>None</span>
                )}
              </TableCell>
            </TableRow>
            <TableRow className={`${classes.tableStripedRow} ${classes.tableRowHover}`}>
              <TableCell className={classes.tableCell}>
                <h6>Token</h6>
              </TableCell>
              <TableCell className={classes.tableCell} colSpan={9}>
                <h6>{account.balances.map(bal => `${bal.split(' ')[0]} ${bal.split(' ')[1]}`).join(', ')}</h6>
                <NavLink to="tokenPrices" key={`route-tokenPrices`}>
                  <h4>More information</h4>
                </NavLink>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            <TableRow className={`${classes.tableRowHover}`}>
              <TableCell className={classes.tableCell}>
                <h6>
                  Load an account to view your resource utilitization and balances. For a detailed explanation watch the
                  following{' '}
                  <a href="https://youtu.be/qwhmACPo5jM" target="new">
                    video tutorial
                  </a>.
                </h6>
              </TableCell>
            </TableRow>
            <TableRow className={`${classes.tableStripedRow} ${classes.tableRowHover}`}>
              <TableCell className={classes.tableCell}>
                <p>
                  If your account details keep disappearing it is because many networks are close to you. Select one
                  manually by clicking "Change Network" to prevent this.
                </p>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </div>
  );
}

export default withStyles(tableStyle)(ResourcesTable);
