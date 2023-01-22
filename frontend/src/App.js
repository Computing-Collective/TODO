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
  const [assignment, setAssignments] = useState(() => {
    axios.get(`/api/get-all`).then((response) => {
      console.log(response);
    });
  });
  const [announcements, setAnnouncements] = useState(() => {
    axios.get(`/api/get-all`).then((response) => {
      console.log(response);
    });
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Buttons */}
        <span style={{ padding: "40px" }}>
          <Stack direction="row" spacing={2} justifyContent="left">
            <span style={{ paddingLeft: "30px" }}>
              <IconButton
                onClick={() => {
                  axios.get(`/api/new-${view}`).then((response) => {
                    // rows = response...
                    console.log(response);
                  });
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
        <DataTable rows={rows} style={{}} />
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
        <ExpandedView id={0} />
      </Stack>
    </Grid>
  );
}

export default App;

let rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", description: 35 },
  {
    id: 2,
    course: "CPEN 212",
    dueDate: Date.now(),
    title: "Lab 2",
    description: "pain and suffering :D",
    lastName: "hi",
    firstName: "bye",
    // completed: <CheckBoxOutlineBlankIcon />,
  },
];

function refreshPage() {
  axios({
    method: "GET",
    url:"http://localhost:5000/getall",
  })
  .then(
    function (response) {
      for (let i = 0; i < response.data.length; i++) {
        console.log(response.data[i]);
      }
      rows = response.data;
      console.log(rows);
    }
  )
}
