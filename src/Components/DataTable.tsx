import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


import { useAppSelector, useAppDispatch } from '../State/Hooks';

import './DataTable.scss';
import { ITransactionItem } from '../State/Reducer';
import { addIncome, addExpense } from '../State/Actions';

const subtotal = (items: readonly ITransactionItem[]) => {
  return items.map(({ amount }) => amount).reduce((sum, i) => sum + i, 0);
}

const DataTable = () => {

  const dispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);

  const [date, setDate] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [amount, setAmount] = React.useState('0');
  const [type, setType] = React.useState(false);

  const rows = useAppSelector(state => state.list);

  const openDialog = () => { setOpen(true); }
  const closeDialog = () => {
    setDate('');
    setDesc('');
    setAmount('0');
    setOpen(false);
  }

  const addItem = () => {
    if (date && desc && amount) {
      if (type) {
        dispatch(addIncome(date, desc, Number(amount)));
      }
      else {
        dispatch(addExpense(date, desc, Number(amount)));
      }
    }
    closeDialog();
  }

  return (
    <section className='data-table'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} align="right">
                <Fab color="primary" aria-label="add" onClick={openDialog} >
                  <AddIcon />
                </Fab>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">Desc</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell align="right">{row.desc}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="right" colSpan={3}>Total: {subtotal(rows)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={(_, reason) => { if (reason !== 'backdropClick') { closeDialog(); } }}>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' }, '& .ToggleButton-root': { m: 2 } }} noValidate autoComplete="off">
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            <TextField required id="outlined-required" label="Description" value={desc} onChange={e => setDesc(e.target.value)} />
            <ToggleButtonGroup color="primary" value={type} exclusive onChange={(_, v) => setType(v)}>
              <ToggleButton value={true}>Income</ToggleButton>
              <ToggleButton value={false}>Expense</ToggleButton>
            </ToggleButtonGroup>
            <TextField id="outlined-number" label="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} InputLabelProps={{ shrink: true, }} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={closeDialog} >Cancel</Button>
          <Button variant="contained" onClick={addItem} >Add</Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default DataTable;
