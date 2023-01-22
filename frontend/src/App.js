import * as React from "react";
import Grid from "@mui/material/Grid";
import DataTable from "./components/DataTable";
import ContainedButtons from "./components/ContainedButton";
import OutlinedButton from "./components/OutlinedButton";
import Stack from "@mui/material/Stack";
import axios, { isCancel, AxiosError } from "axios";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import refreshPage from "./functions/refresh";

function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Buttons */}
        <span style={{ padding: "40px" }}>
          <Stack direction="row" spacing={2} justifyContent="left">
            <span>
              <IconButton
                onClick={() => {
                  refreshPage();
                }}
                aria-label="refresh"
                style={{}}
              >
                <RefreshIcon />
              </IconButton>
            </span>
            <span style={{ flexGrow: 0.5 }} />
            <ContainedButtons text="Announcement view" width="200px" />
            <ContainedButtons text="Assignment view" width="200px" />
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
          backgroundColor: "",
          overflowY: "hidden",
          width: "50vw",
        }}
      >
        {/* Table */}
        <DataTable rows={rows} />
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
      ></Stack>
    </Grid>
  );
}

export default App;

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", description: 35 },
  {
    id: 2,
    course: "CPEN 212",
    dueDate: Date.now(),
    title: "Lab 2",
    description: "pain and suffering :D",
    // completed: <CheckBoxOutlineBlankIcon />,
  },
];


