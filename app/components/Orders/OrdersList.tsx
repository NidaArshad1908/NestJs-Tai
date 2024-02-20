import { Button, ThemeProvider } from 'react-bootstrap';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import {
  createTheme,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import styles from '../../styles/Home.module.css';
import MaterialTable, { MTableToolbar } from 'material-table';
import {
  Add,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  Delete,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@mui/icons-material';
import { NextPage } from 'next';

interface Orders {
  id?: number;
  size: string;
  orderdate: string;
  returndate: string;
  clothrate: string;
  rates: string;
  quantity: string;
  total: string;
  outstanding: string;
  amount: string;
  dues: string;
  status: string;
  actions: string;
  button: string;
  dryclean: string;
  others: string;
  advance: string;
  discount: string;
}

const OrdersList: NextPage = () => {
  const [todos, setTodos] = useState<Orders[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<Orders[]>([]);
  const [UpdateTitle, setUpdateTitle] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [addOpenDialog, setAddOpenDialog] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const tableRef = useRef<any>();

  const defaultMaterialTheme = createTheme();

  useEffect(() => {
    fetch('http://localhost:4000/orderslist/all')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setRefetch(false));
  }, [refetch]);

  const handleClickOpen = () => {
    setUpdateTitle(selectedTodos[0]?.size);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const addHandleClose = () => {
    setAddOpenDialog(false);
  };

  const handleUpdateAndClose = () => {
    let todoToUpdate: Orders = {
      id: selectedTodos[0]?.id,
      size: UpdateTitle,
      orderdate: UpdateTitle,
      returndate: UpdateTitle,
      clothrate: UpdateTitle,
      rates: UpdateTitle,
      quantity: UpdateTitle,
      total: UpdateTitle,
      outstanding: UpdateTitle,
      amount: UpdateTitle,
      dues: UpdateTitle,
      status: UpdateTitle,
      actions: UpdateTitle,
      button: UpdateTitle,
      dryclean: UpdateTitle,
      others: UpdateTitle,
      advance: UpdateTitle,
      discount: UpdateTitle,
    };

    createOrUpdate(todoToUpdate);
    tableRef.current.onAllSelected(false);
    setOpenDialog(false);
  };

  const handleAddAndClose = () => {
    let todoToAdd: Orders = {
      id: selectedTodos[0]?.id,
      size: input,
      orderdate: input,
      returndate: input,
      clothrate: input,
      rates: input,
      quantity: input,
      total: input,
      outstanding: input,
      amount: input,
      dues: input,
      status: input,
      actions: input,
      button: input,
      dryclean: input,
      others: input,
      advance: input,
      discount: input,
    };

    createOrUpdate(todoToAdd);
    tableRef.current.onAllSelected(false);
    setAddOpenDialog(false);
  };

  const handleUpdateFieldChange = (event: any) => {
    setUpdateTitle(event.target.value);
  };

  const components = {
    Toolbar: (props: any) => (
      <div className={styles.firstRow}>
        <Box className={styles.width100}>
          <MTableToolbar {...props} />
        </Box>
        <Box className={styles.icons}>
          <IconButton onClick={onInputChange} size="large" value={input}>
            <Add />
          </IconButton>
          <IconButton
            disabled={selectedTodos.length !== 1}
            onClick={handleClickOpen}
            size="large"
          >
            <Edit />
          </IconButton>
          <IconButton
            disabled={selectedTodos.length < 1}
            onClick={deleteTodo}
            size="large"
          >
            <Delete />
          </IconButton>
        </Box>
      </div>
    ),
  };

  const createOrUpdate = (todo: Orders) => {
    fetch('http://localhost:4000/orderslist/createOrUpdate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('🚀 ~ file: index.tsx:106 ~ createOrUpdate ~ data:', data);
        setRefetch(true);
      })
      .catch((err) => console.log(err))
      .finally(() => setRefetch(false));
  };

  const addTodo = (event: any) => {
    event.preventDefault();
    console.log('add todo::input value', input);
    if (input) {
      let newTodo: Orders = {
        size: input,
        orderdate: input,
        returndate: input,
        clothrate: input,
        rates: input,
        quantity: input,
        total: input,
        outstanding: input,
        amount: input,
        dues: input,
        status: input,
        actions: input,
        button: input,
        dryclean: input,
        others: input,
        advance: input,
        discount: input,
      };

      createOrUpdate(newTodo);
      setInput('');
    }
  };

  const deleteTodo = (event: any) => {
    let idsToDelete: number[] = selectedTodos
      .filter((todo) => todo.id)
      .map((todo) => todo.id as number);
    fetch(`http://localhost:4000/orderslist/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(idsToDelete),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('🚀 ~ file: index.tsx:106 ~ delete ~ data:', data);
        setRefetch(true);
      })
      .catch((err) => console.log(err))
      .finally(() => setRefetch(false));
  };

  const onInputChange = (event: any) => {
    console.log('value::', event.target.value);
    setInput(event.target.value);
    setAddOpenDialog(true);
  };

  return (
    <div style={{ marginRight: -15, marginLeft: -15, marginTop: -15, marginBottom: -15 }}>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          tableRef={tableRef}
          icons={{
            Add: forwardRef((props, ref) => <Add {...props} ref={ref} />),
            Check: forwardRef((props, ref) => (
              <Check aria-label="Check" {...props} ref={ref} />
            )),
            Clear: forwardRef((props, ref) => (
              <Clear aria-label="Clear" {...props} ref={ref} />
            )),
            //Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => (
              <ChevronRight aria-label="Details" {...props} ref={ref} />
            )),
            Edit: forwardRef((props, ref) => (
              <Edit aria-label="Edit" {...props} ref={ref} />
            )),
            Export: forwardRef((props, ref) => (
              <SaveAlt aria-label="Export" {...props} ref={ref} />
            )),
            Filter: forwardRef((props, ref) => (
              <FilterList aria-label="Filter List" {...props} ref={ref} />
            )),
            FirstPage: forwardRef((props, ref) => (
              <FirstPage aria-label="First Page" {...props} ref={ref} />
            )),
            LastPage: forwardRef((props, ref) => (
              <LastPage aria-label="Last Page" {...props} ref={ref} />
            )),
            NextPage: forwardRef((props, ref) => (
              <ChevronRight aria-label="Next Page" {...props} ref={ref} />
            )),
            PreviousPage: forwardRef((props, ref) => (
              <ChevronLeft aria-label="Previous Page" {...props} ref={ref} />
            )),
            ResetSearch: forwardRef((props, ref) => (
              <Clear aria-label="Clear" {...props} ref={ref} />
            )),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => (
              <ArrowUpward aria-label="Sort List" {...props} ref={ref} />
            )),
            ThirdStateCheck: forwardRef((props, ref) => (
              <Remove aria-label="Remove" {...props} ref={ref} />
            )),
            ViewColumn: forwardRef((props, ref) => (
              <ViewColumn aria-label="View Column" {...props} ref={ref} />
            )),
          }}
          columns={[
            { title: 'ID', field: 'id' },
            { title: 'Customer Size', field: 'size' },
            { title: 'Order Date', field: 'orderdate' },
            { title: 'Return Date', field: 'returndate' },
            { title: 'Cloth Rate', field: 'clothrate' },
            { title: 'Rates', field: 'rates' },
            { title: 'Quantity', field: 'quantity' },
            { title: 'Total', field: 'total' },
            { title: 'OutStanding', field: 'outstanding' },
            { title: 'Amount', field: 'amount' },
            { title: 'Dues', field: 'dues' },
            { title: 'Status', field: 'status' },
            { title: 'Actions', field: 'actions' },
            { title: 'Button', field: 'button' },
            { title: 'Dry Clean', field: 'dryclean' },
            { title: 'Others', field: 'others' },
            { title: 'Advance', field: 'advance' },
            { title: 'Discount', field: 'discount' },
          ]}
          data={todos}
          title="Orders"
          components={components}
          options={{
            selection: true,
          }}
          onSelectionChange={(rows: Orders[]) => {
            setSelectedTodos([...rows]);
          }}
        />
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Users Name</DialogTitle>
          <DialogContent>
            <TextField
              variant="standard"
              autoFocus
              margin="dense"
              id="title"
              label="Name"
              type="text"
              fullWidth
              value={UpdateTitle}
              onChange={handleUpdateFieldChange}
            />
            <br />
            <TextField
              variant="standard"
              autoFocus
              margin="dense"
              id="title"
              label="Kameez"
              type="text"
              fullWidth
              value={UpdateTitle}
              onChange={handleUpdateFieldChange}
            />
            <br />
            <TextField
              variant="standard"
              autoFocus
              margin="dense"
              id="title"
              label="Shalwar Kameez"
              type="text"
              fullWidth
              value={UpdateTitle}
              onChange={handleUpdateFieldChange}
            />
            <br />
            <TextField
              variant="standard"
              autoFocus
              margin="dense"
              id="title"
              label="Received"
              type="text"
              fullWidth
              value={UpdateTitle}
              onChange={handleUpdateFieldChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleUpdateAndClose}
              color="primary"
              disabled={!UpdateTitle}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={addOpenDialog}
          onClose={addHandleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Users</DialogTitle>
          <DialogContent onSubmit={addTodo}>
            <TextField
              autoComplete="off"
              variant="standard"
              label="Name"
              type="text"
              value={input}
              onChange={onInputChange}
            />
            <br />
            <TextField
              autoComplete="off"
              variant="standard"
              label="Kameez"
              type="number"
              value={input}
              onChange={onInputChange}
            />
            <br />
            <TextField
              autoComplete="off"
              variant="standard"
              label="Shalwar Kameez"
              type="number"
              value={input}
              onChange={onInputChange}
            />
            <br />
            <TextField
              autoComplete="off"
              variant="standard"
              label="Recived"
              type="number"
              value={input}
              onChange={onInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={addHandleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleAddAndClose}
              color="primary"
              disabled={!input}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};
export default OrdersList;
