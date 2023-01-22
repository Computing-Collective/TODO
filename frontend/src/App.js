import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import DataTable from "./components/DataTable";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios, { isCancel, AxiosError } from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import { Announcement } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import ExpandedView from "./components/Expanded";

function App() {
  const [view, setView] = useState("announcements");
  // const [assignments, setAssignments] = useState(refreshTable("new-assignments")); // holds all the assignments for the table
  // const [announcements, setAnnouncements] = useState(refreshTable("new-announcements")); // holds all the announcements for the table
  const [assignments, setAssignments] = useState([
    {
      id: 2,
      course: "CPEN 212",
      dueDate: Date.now(),
      title: "Lab 2",
      description: "pain and suffering :D",
      // completed: <CheckBoxOutlineBlankIcon />,
    },
  ]);
  const [announcements, setAnnouncements] = useState([
    {
      id: 3,
      course: "CPSC 221",
      dueDate: Date.now(),
      title: "github login",
      description: "should be easy go to canvas",
    },
  ]);
  const [rows, setRows] = useState([
    // {
    //   id: 2,
    //   course: "CPEN 212",
    //   dueDate: Date.now(),
    //   title: "Lab 2",
    //   description: "pain and suffering :D",
    //   // completed: <CheckBoxOutlineBlankIcon />,
    // },
    // {
    //   id: 3,
    //   course: "CPSC 221",
    //   dueDate: Date.now(),
    //   title: "github login",
    //   description: "should be easy go to canvas",
    // },
  ]); // holds all the rows in the table right now
  const [row, selectRow] = useState({
    id: 0,
    course: "Welcome to TODO",
    dueDate: Date.now(),
  }); // holds the row that is selected

  async function refreshTable(request) {
    // request can be getall, new-announcements, new-assignments, mark-complete/<dataType>/<identifier>
    setRows([...announcements, ...assignments]);
    // try {
    //   let result = await axios({
    //     method: "GET",
    //     url: `http://localhost:5000/api/${request}`,
    //   });
    //   // console.log(result.response.data);
    // } catch (err) {
    //   // console.error(err.response.data);
    // }
    // .then(function (response) {
    //   console.log(response);
    //   // for (let i = 0; i < response.data.length; i++) {
    //   //   // console.log(response.data[i]);
    //   // }
    //   // setRows(response.data);
    // });
  }

  const tableToPaper = (childData) => {
    selectRow(childData);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Buttons */}
        <span style={{ padding: "40px" }}>
          <Stack direction="row" spacing={2} justifyContent="left">
            <span style={{ paddingLeft: "30px" }}>
              {/* refreshbutton */}
              <IconButton
                onClick={() => {
                  refreshTable(`new-${view}`);
                }}
                aria-label="refresh"
              >
                <RefreshIcon sx={{ color: "white" }} />
              </IconButton>
            </span>
            <span style={{ flexGrow: 0.5 }} />
            {/* announcement buttons */}
            <Button
              variant="contained"
              onClick={() => {
                console.log("hi");
                setRows(announcements);
                console.log(announcements);
              }}
              style={{
                width: "200px",
              }}
            >
              Announcement view
            </Button>
            {/* assignment button */}
            <Button
              variant="contained"
              onClick={() => {
                setRows(assignments);
                console.log(assignments);
              }}
              style={{
                width: "200px",
              }}
            >
              Assignment view
            </Button>
          </Stack>
        </span>
      </Grid>
      {/* Left */}
      <Stack
        alignItems="center"
        className="LeftContainer"
        direction="column"
        spacing={2}
        style={{
          overflowY: "hidden",
          width: "50vw",
        }}
      >
        {/* Table */}
        <DataTable rows={rows} tableToPaper={tableToPaper} />
      </Stack>

      {/* Right */}
      <Stack
        className="RightContainer"
        direction="column"
        spacing={2}
        style={{
          overflowY: "scroll",
          width: "50vw",
          height: "100vh",
        }}
      >
        {/* paper */}
        <ExpandedView id={0} content={row} />
      </Stack>
    </Grid>
  );
}

export default App;
