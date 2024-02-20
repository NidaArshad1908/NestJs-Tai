import { Button, ThemeProvider } from 'react-bootstrap';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import {
  Box,
  createTheme,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
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
import styles from '../../styles/Home.module.css';
import { NextPage } from 'next';

interface Users {
  id?: number;
  username: string;
  email: string;
  created: string;
  lastupdated: string;
  role: string;
  status: string;
  actions: string;
}

const UserList: NextPage = () => {
  const [todos, setTodos] = useState<Users[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<Users[]>([]);
  const [UpdateTitle, setUpdateTitle] = useState<string>('');
  const [UpdateTitleemail, setUpdateTitleemial] = useState<string>('');
  const [UpdateTitlecreated, setUpdateTitlecreated] = useState<string>('');
  const [UpdateTitleupdated, setUpdateTitleupdated] = useState<string>('');
  const [UpdateTitlerole, setUpdateTitlerole] = useState<string>('');
  const [UpdateTitlestatus, setUpdateTitlestatus] = useState<string>('');

  const [input, setInput] = useState<string>('');
  const [inputemail, setInputemail] = useState<string>('');
  const [inputcreated, setInputcreated] = useState<string>('');
  const [inputupdated, setInputudated] = useState<string>('');
  const [inputrole, setInputrole] = useState<string>('');
  const [inputstatus, setInputstaus] = useState<string>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [addOpenDialog, setAddOpenDialog] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const tableRef = useRef<any>();

  const defaultMaterialTheme = createTheme();

  useEffect(() => {
    fetch('http://localhost:4000/userslist/all')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setRefetch(false));
  }, [refetch]);

  const handleClickOpen = () => {
    setUpdateTitle(selectedTodos[0]?.username);
    setUpdateTitleemial(selectedTodos[0]?.email);
    setUpdateTitlecreated(selectedTodos[0]?.created);
    setUpdateTitleupdated(selectedTodos[0]?.lastupdated);
    setUpdateTitlerole(selectedTodos[0]?.role);
    setUpdateTitlestatus(selectedTodos[0]?.status);

    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const addHandleClose = () => {
    setAddOpenDialog(false);
  };

  const handleUpdateAndClose = () => {
    let todoToUpdate: Users = {
      id: selectedTodos[0]?.id,
      username: UpdateTitle,
      email: UpdateTitleemail,
      created: UpdateTitlecreated,
      lastupdated: UpdateTitleupdated,
      role: UpdateTitlerole,
      status: UpdateTitlestatus,
      actions: '',
    };

    createOrUpdate(todoToUpdate);
    tableRef.current.onAllSelected(false);
    setOpenDialog(false);
  };

  const handleAddAndClose = () => {
    let todoToAdd: Users = {
      id: selectedTodos[0]?.id,
      username: input,
      email: inputemail,
      created: inputcreated,
      lastupdated: inputupdated,
      role: inputrole,
      status: inputstatus,
      actions: '',
    };

    createOrUpdate(todoToAdd);
    tableRef.current.onAllSelected(false);
    setAddOpenDialog(false);
  };

  const handleUpdateFieldChange = (event: any) => {
    setUpdateTitle(event.target.value);
  };

  const handleUpdateemailFieldChange = (event: any) => {
    setUpdateTitleemial(event.target.value);
  };

  const handleUpdatecreatedFieldChange = (event: any) => {
    setUpdateTitlecreated(event.target.value);
  };

  const handleUpdateupdatedFieldChange = (event: any) => {
    setUpdateTitleupdated(event.target.value);
  };

  const handleUpdateroleFieldChange = (event: any) => {
    setUpdateTitlerole(event.target.value);
  };

  const handleUpdatestatusFieldChange = (event: any) => {
    setUpdateTitlestatus(event.target.value);
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

  const createOrUpdate = (todo: Users) => {
    fetch('http://localhost:4000/userslist/createOrUpdate', {
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
      let newTodo: Users = {
        username: input,
        email: inputemail,
        created: inputcreated,
        lastupdated: inputupdated,
        role: inputrole,
        status: inputstatus,
        actions: '',
      };

      createOrUpdate(newTodo);
      setInput('');
    }
  };

  const deleteTodo = (event: any) => {
    let idsToDelete: number[] = selectedTodos
      .filter((todo) => todo.id)
      .map((todo) => todo.id as number);
    fetch(`http://localhost:4000/userslist/delete`, {
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
  const onInputemailChange = (event: any) => {
    console.log('value::', event.target.value);
    setInputemail(event.target.value);
    setAddOpenDialog(true);
  };
  const onInputcreatedChange = (event: any) => {
    console.log('value::', event.target.value);
    setInputcreated(event.target.value);
    setAddOpenDialog(true);
  };
  const onInputupdatedChange = (event: any) => {
    console.log('value::', event.target.value);
    setInputudated(event.target.value);
    setAddOpenDialog(true);
  };
  const onInputroleChange = (event: any) => {
    console.log('value::', event.target.value);
    setInputrole(event.target.value);
    setAddOpenDialog(true);
  };
  const onInputstatusChange = (event: any) => {
    console.log('value::', event.target.value);
    setInputstaus(event.target.value);
    setAddOpenDialog(true);
  };

  return (
    <div
      style={{
        marginRight: -15,
        marginLeft: -15,
        marginTop: -15,
        marginBottom: -15,
      }}
    >
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
            { title: 'Username', field: 'username' },
            { title: 'Email', field: 'email' },
            { title: 'Created', field: 'created' },
            { title: 'Last Updated', field: 'lastupdated' },
            { title: 'Role', field: 'role' },
            { title: 'Status', field: 'status' },
            { title: 'Action', field: 'actions' },
          ]}
          data={todos}
          title="Users"
          components={components}
          options={{
            selection: true,
          }}
          onSelectionChange={(rows: Users[]) => {
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
              label="Username"
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
              label="E-mail"
              type="email"
              fullWidth
              value={UpdateTitleemail}
              onChange={handleUpdateemailFieldChange}
            />
            <br />
            <TextField
              variant="standard"
              autoFocus
              margin="dense"
              id="title"
              label="Created"
              type="text"
              fullWidth
              value={UpdateTitlecreated}
              onChange={handleUpdatecreatedFieldChange}
            />
            <br />
            <TextField
              variant="standard"
              autoFocus
              margin="dense"
              id="title"
              label="Last Updated"
              type="text"
              fullWidth
              value={UpdateTitleupdated}
              onChange={handleUpdateupdatedFieldChange}
            />
            <br></br>
            <TextField
              variant="standard"
              autoFocus
              margin="dense"
              id="title"
              label="Role"
              type="text"
              fullWidth
              value={UpdateTitlerole}
              onChange={handleUpdateroleFieldChange}
            />
            <TextField
              variant="standard"
              autoFocus
              margin="dense"
              id="title"
              label="Status"
              type="text"
              fullWidth
              value={UpdateTitlestatus}
              onChange={handleUpdatestatusFieldChange}
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
              label="Username"
              type="text"
              value={input}
              onChange={onInputChange}
            />
            <br />
            <TextField
              autoComplete="off"
              variant="standard"
              label="E-mail"
              type="email"
              value={inputemail}
              onChange={onInputemailChange}
            />
            <br />
            <TextField
              autoComplete="off"
              variant="standard"
              label="Created"
              type="text"
              value={inputcreated}
              onChange={onInputcreatedChange}
            />
            <br />
            <TextField
              autoComplete="off"
              variant="standard"
              label="Last Updated"
              type="text"
              value={inputupdated}
              onChange={onInputupdatedChange}
            />{' '}
            <TextField
              autoComplete="off"
              variant="standard"
              label="Role"
              type="text"
              value={inputrole}
              onChange={onInputroleChange}
            />
            <TextField
              autoComplete="off"
              variant="standard"
              label="Status"
              type="text"
              value={inputstatus}
              onChange={onInputstatusChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={addHandleClose} color="pink">
              Cancel
            </Button>
            <Button
              onClick={handleAddAndClose}
              color="secondary"
              // disabled={!input}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};
export default UserList;
