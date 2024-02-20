/* eslint-disable react/display-name */
// Home page
import type { NextPage } from "next";
import { Card } from "react-bootstrap";
import { Bar, Line } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { AdminLayout } from "./layout";
import CountUp from "react-countup";
import {
  TextField,
  ThemeProvider,
  createTheme,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useEventCallback,
} from "@mui/material";
import styles from "../styles/Home.module.css";
import { Add, ArrowUpward, Delete, DeleteOutline } from "@mui/icons-material";
import Check from "@mui/icons-material/Check";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Clear from "@mui/icons-material/Clear";
import Edit from "@mui/icons-material/Edit";
import FilterList from "@mui/icons-material/FilterList";
import FirstPage from "@mui/icons-material/FirstPage";
import LastPage from "@mui/icons-material/LastPage";
import Remove from "@mui/icons-material/Remove";
import SaveAlt from "@mui/icons-material/SaveAlt";
import Search from "@mui/icons-material/Search";
import ViewColumn from "@mui/icons-material/ViewColumn";
import MaterialTable, { MTableToolbar } from "material-table";
import { forwardRef } from "react";
import router from "next/router";

interface Worker {
  id?: number;
  name: string;
  kameez: string;
  shalwarkameez: string;
  received: string;
}

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Filler
);

const Home: NextPage = () => {
  const [todos, setTodos] = useState<Worker[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<Worker[]>([]);
  const [UpdateTitle, setUpdateTitle] = useState<string>("");
  const [UpdateTitlek, setUpdateTitlek] = useState<string>("");
  const [UpdateTitlesk, setUpdateTitlesk] = useState<string>("");
  const [UpdateTitler, setUpdateTitler] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [inputk, setInputk] = useState<string>("");
  const [inputsk, setInputsk] = useState<string>("");
  const [inputr, setInputr] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [addOpenDialog, setAddOpenDialog] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const tableRef = useRef<any>();

  const defaultMaterialTheme = createTheme();

  useEffect(() => {
    fetch("http://localhost:4001/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setRefetch(false));
  }, [refetch]);

  const handleClickOpen = () => {
    setUpdateTitle(selectedTodos[0]?.name);
    setUpdateTitlek(selectedTodos[0]?.kameez);
    setUpdateTitlesk(selectedTodos[0]?.shalwarkameez);
    setUpdateTitler(selectedTodos[0]?.received);

    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const addHandleClose = () => {
    setAddOpenDialog(false);
  };

  const handleUpdateAndClose = () => {
    let todoToUpdate: Worker = {
      id: selectedTodos[0]?.id,
      name: UpdateTitle,
      kameez: UpdateTitlek,
      shalwarkameez: UpdateTitlesk,
      received: UpdateTitler,
    };

    createOrUpdate(todoToUpdate);
    tableRef.current.onAllSelected(false);
    setOpenDialog(false);
  };

  const handleAddAndClose = async () => {
    let todoToAdd: Worker = {
      id: selectedTodos[0]?.id,
      name: input,
      // kameez: '',
      kameez: inputk,
      // shalwarkameez: '',
      shalwarkameez: inputsk,
      // received: '',
      received: inputr,
    };

    const res = await fetch("/api/mutateData");
    if (res.ok) {
      await router.push("/"); // Reload the page
    }

    createOrUpdate(todoToAdd);
    tableRef.current.onAllSelected(false);
    setAddOpenDialog(false);
  };

  const handleUpdateFieldChange = (event: any) => {
    setUpdateTitle(event.target.value);
  };
  const handleUpdatekFieldChange = (event: any) => {
    setUpdateTitlek(event.target.value);
  };

  const handleUpdateskFieldChange = (event: any) => {
    setUpdateTitlesk(event.target.value);
  };
  const handleUpdaterFieldChange = (event: any) => {
    setUpdateTitler(event.target.value);
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

  const createOrUpdate = (todo: Worker) => {
    fetch("http://localhost:4001/createOrUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("🚀 ~ file: index.tsx:106 ~ createOrUpdate ~ data:", data);
        setRefetch(true);
      })
      .catch((err) => console.log(err))
      .finally(() => setRefetch(false));
  };

  const addTodo = (event: any) => {
    event.preventDefault();
    console.log("add todo::input value", input);
    if (input) {
      let newTodo: Worker = {
        name: input,
        // kameez: '',
        kameez: inputk,
        // shalwarkameez: '',
        shalwarkameez: inputsk,
        // received: '',
        received: inputr,
      };

      createOrUpdate(newTodo);
      setInput("");
      // setInputk('');
    }
  };

  const deleteTodo = (event: any) => {
    let idsToDelete: number[] = selectedTodos
      .filter((todo) => todo.id)
      .map((todo) => todo.id as number);
    fetch(`http://localhost:4001/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(idsToDelete),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("🚀 ~ file: index.tsx:106 ~ delete ~ data:", data);
        setRefetch(true);
      })
      .catch((err) => console.log(err))
      .finally(() => setRefetch(false));
  };

  const onInputChange = (event: any) => {
    console.log("value::", event.target.value);
    setInput(event.target.value);
    setAddOpenDialog(true);
  };

  const onInputkChange = (event: any) => {
    console.log("value::", event.target.value);
    setInputk(event.target.value);
    setAddOpenDialog(true);
  };

  const onInputskChange = (event: any) => {
    console.log("value::", event.target.value);
    setInputsk(event.target.value);
    setAddOpenDialog(true);
  };

  const onInputrChange = (event: any) => {
    console.log("value::", event.target.value);
    setInputr(event.target.value);
    setAddOpenDialog(true);
  };

  return (
    <AdminLayout>
      {/* Counter-Up */}
      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <Card bg="primary" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  <CountUp
                    className="account-balance"
                    start={0}
                    end={11455}
                    duration={2}
                    useEasing={true}
                    separator=""
                    style={{ color: "#fff", fontSize: 20 }}
                  />
                </div>
                <div>Total Orders</div>
              </div>
            </Card.Body>
            <div className="mt-3 mx-3" style={{ height: "70px" }}>
              <Line
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: 30,
                      max: 89,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                      tension: 0.4,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: "transparent",
                      borderColor: "rgba(255,255,255,.55)",
                      data: [65, 59, 84, 84, 51, 55, 40],
                    },
                  ],
                }}
              />
            </div>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="info" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  <CountUp
                    className="account-balance"
                    start={0}
                    end={1043}
                    duration={2}
                    useEasing={true}
                    separator=""
                    style={{ color: "#fff", fontSize: 20 }}
                  />
                </div>
                <div>Income</div>
              </div>
            </Card.Body>
            <div className="mt-3 mx-3" style={{ height: "70px" }}>
              <Line
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: -9,
                      max: 39,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: "transparent",
                      borderColor: "rgba(255,255,255,.55)",
                      data: [1, 18, 9, 17, 34, 22, 11],
                    },
                  ],
                }}
              />
            </div>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="warning" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  <CountUp
                    className="account-balance"
                    start={0}
                    end={10412}
                    duration={2}
                    useEasing={true}
                    separator=""
                    style={{ color: "#fff", fontSize: 20 }}
                  />
                </div>
                <div>Conversion Rate</div>
              </div>
            </Card.Body>
            <div className="mt-3 mx-3" style={{ height: "70px" }}>
              <Line
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 2,
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                  ],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderColor: "rgba(255,255,255,.55)",
                      data: [78, 81, 80, 45, 34, 12, 40],
                      fill: true,
                    },
                  ],
                }}
              />
            </div>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="danger" text="white" className="mb-4">
            <Card.Body className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  <CountUp
                    className="account-balance"
                    start={0}
                    end={3983}
                    duration={2}
                    useEasing={true}
                    separator=""
                    style={{ color: "#fff", fontSize: 20 }}
                  />
                </div>
                <div>Sessions</div>
              </div>
            </Card.Body>
            <div className="mt-3 mx-3" style={{ height: "70px" }}>
              <Bar
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                        drawTicks: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                }}
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                    "January",
                    "February",
                    "March",
                    "April",
                  ],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: "rgba(255,255,255,.2)",
                      borderColor: "rgba(255,255,255,.55)",
                      data: [
                        78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84,
                        67, 82,
                      ],
                      barPercentage: 0.6,
                    },
                  ],
                }}
              />
            </div>
          </Card>
        </div>
      </div>
      {/* Table Form */}
      <Card style={{ width: 1320, backgroundColor: "#3c4b64" }}>
        <Card.Header style={{ color: "#FFFFFF" }}>Worker Summary</Card.Header>
        <Card.Body>
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
                  // eslint-disable-next-line react/display-name
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
                    <ChevronLeft
                      aria-label="Previous Page"
                      {...props}
                      ref={ref}
                    />
                  )),
                  ResetSearch: forwardRef((props, ref) => (
                    <Clear aria-label="Clear" {...props} ref={ref} />
                  )),
                  Search: forwardRef((props, ref) => (
                    <Search {...props} ref={ref} />
                  )),
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
                  { title: "ID", field: "id" },
                  { title: "Name", field: "name" },
                  { title: "Kameez", field: "kameez" },
                  { title: "Shalwar Kameez", field: "shalwarkameez" },
                  { title: "Received", field: "received" },
                ]}
                data={todos}
                title="Worker Summary"
                components={components}
                options={{
                  selection: true,
                }}
                onSelectionChange={(rows: Worker[]) => {
                  setSelectedTodos([...rows]);
                }}
              />
              <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Update Worker Name
                </DialogTitle>
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
                    value={UpdateTitlek}
                    onChange={handleUpdatekFieldChange}
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
                    value={UpdateTitlesk}
                    onChange={handleUpdateskFieldChange}
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
                    value={UpdateTitler}
                    onChange={handleUpdaterFieldChange}
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
                <DialogTitle id="form-dialog-title">Add Worker</DialogTitle>
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
                    // value={input}
                    value={inputk}
                    // onChange={onInputChange}
                    onChange={onInputkChange}
                  />
                  <br />
                  <TextField
                    autoComplete="off"
                    variant="standard"
                    label="Shalwar Kameez"
                    type="number"
                    // value={input}
                    value={inputsk}
                    // onChange={onInputChange}
                    onChange={onInputskChange}
                  />
                  <br />
                  <TextField
                    autoComplete="off"
                    variant="standard"
                    label="Recived"
                    type="number"
                    // value={input}
                    value={inputr}
                    // onChange={onInputChange}
                    onChange={onInputrChange}
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
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default Home;
