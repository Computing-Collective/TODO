import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import DataTable from "./components/DataTable";
import ContainedButtons from "./components/ContainedButton";
import Stack from "@mui/material/Stack";
import axios, { isCancel, AxiosError } from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import { Announcement } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import ExpandedView from "./components/Expanded";

function App() {
  const [view, setView] = useState("announcements");
  const [assignment, setAssignments] = useState(refreshTable("new-assignments")); // holds all the assignments for the table
  const [announcements, setAnnouncements] = useState(refreshTable("new-announcements")); // holds all the announcements for the table
  // const [rows, setRows] = useState([]); // holds all the rows in the table right now
  const [row, selectRow] = useState({
    id: 0,
    title: "Welcome to TODO",
  }); // holds the row that is selected

  let rows = [
    {
      id: 2,
      course: "CPEN 212",
      dueDate: Date.now(),
      title: "Lab 2",
      description: "pain and suffering :D",
      // completed: <CheckBoxOutlineBlankIcon />,
    },
  ];

  async function refreshTable(request) {
    // request can be getall, new-announcements, new-assignments, mark-complete/<dataType>/<identifier>
    try {
      let result = await axios({
        method: "GET",
        url: `http://localhost:5000/api/${request}`,
      });
      // console.log(result.response.data);
    } catch (err) {
      // console.error(err.response.data);
    }
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
            <ContainedButtons
              onClick={() => {
                setView("announcements");
              }}
              text="Announcement view"
              width="200px"
            />
            <ContainedButtons
              onClick={() => {
                setView("assignments");
              }}
              text="Assignment view"
              width="200px"
            />
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
        <ExpandedView id={0} content={row} />
      </Stack>
    </Grid>
  );
}

export default App;
