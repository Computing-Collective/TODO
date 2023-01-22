import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import DataTable from "./components/DataTable";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios, { isCancel, AxiosError } from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Announcement } from "@mui/icons-material";
import Paper from "@mui/material/Paper";
import ExpandedView from "./components/Expanded";

function App() {
  const [view, setView] = useState("announcements");
  const [announcementButtonState, setAnnouncementButtonState] = useState(true);
  const [assignmentButtonState, setAssignmentButtonState] = useState(true);
  var [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/get-all").then((response) => {
      console.log(response);
      setAssignments(response.data.assignments);
      setAnnouncements(response.data.announcements);
      // console.log(response.data);
      setRows([...announcements, ...assignments]);
    });
  }, [refresh]);

  const [assignments, setAssignments] = useState([]); // holds all the assignments for the table
  const [announcements, setAnnouncements] = useState([]); // holds all the announcements for the table
  // const [assignments, setAssignments] = useState([
  //   {
  //     id: 2,
  //     course: "CPEN 212",
  //     dueDate: Date.now(),
  //     title: "Lab 2",
  //     description: "pain and suffering :D",
  //     // completed: <CheckBoxOutlineBlankIcon />,
  //   },
  // ]);
  // const [announcements, setAnnouncements] = useState([
  //   {
  //     id: 3,
  //     course: "CPSC 221",
  //     dueDate: Date.now(),
  //     title: "github login",
  //     description: "should be easy go to canvas",
  //   },
  // ]);
  const [rows, setRows] = useState([]);// ]); // holds all the rows in the table right now
  const [row, selectRow] = useState({
    id: 0,
    course: "Welcome to TODO",
    dueDate: Date.now(),
  }); // holds the row that is selected

  function getData(request) {
    try {
      axios({
        method: "GET",
        url: `http://localhost:5000/api/${request}`,
      }).then(function (response) {
        return response.data;
      });
    } catch (e) {}
  }

  function refreshTable(request) {
    // request can be getall, new-announcements, new-assignments, mark-complete/<dataType>/<identifier>

    getData(request);

    // console.log(result.response.data);

    setRows([...announcements, ...assignments]);
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
                onClick={(e) => {
                  setRefresh(refresh++);
                  // e.preventDefault();
                  refreshTable(`new-${view}`);
                }}
                aria-label="refresh"
              >
                <RefreshIcon sx={{ color: "white" }} />
              </IconButton>
            </span>
            <span style={{ flexGrow: 0.43 }} />
            {/* announcement buttons */}
            <ButtonGroup>
              <Button
                variant="contained"
                onClick={() => {
                  console.log(announcements);
                  setRows(announcements);
                  setView("announcements");
                  setAnnouncementButtonState(!announcementButtonState);
                  setAssignmentButtonState(announcementButtonState);
                }}
                style={{
                  width: "200px",
                }}
                disabled={announcementButtonState ? false : true}
              >
                Announcement view
              </Button>
              {/* assignment button */}
              <Button
                variant="contained"
                onClick={() => {
                  setRows(assignments);
                  setView("assignments");
                  setAssignmentButtonState(!assignmentButtonState);
                  setAnnouncementButtonState(assignmentButtonState);
                }}
                style={{
                  width: "200px",
                }}
                disabled={assignmentButtonState ? false : true}
              >
                Assignment view
              </Button>
            </ButtonGroup>
          </Stack>
        </span>
      </Grid>
      <Grid item xs={6} 
        style={{
          overflowY: "hidden",
          width: "50vw",
          height: "88vh",
        }}>
        {/* Left */}
        <Stack
          alignItems="center"
          className="LeftContainer"
          direction="column"
          spacing={2}
        >
          {/* Table */}
          <DataTable rows={rows} tableToPaper={tableToPaper} view={view} />
        </Stack>
      </Grid>
      <Grid item xs={6} 
        style={{
          overflowY: "scroll",
          width: "50vw",
          height: "88vh",
        }}>
        {/* Right */}
        <Stack
          className="RightContainer"
          direction="column"
          spacing={2}
        >
          {/* paper */}
          <ExpandedView id={0} content={row} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default App;
