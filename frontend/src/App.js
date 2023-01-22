import * as React from "react";
import Grid from "@mui/material/Grid";
import DataTable from "./components/DataTable";
import ContainedButtons from "./components/ContainedButton";
import OutlinedButton from "./components/OutlinedButton";
import Stack from "@mui/material/Stack";

function App() {
  return (
    <Grid container>
      {/* Left */}
      <Stack
        alignItems="center"
        className="LeftContainer"
        direction="column"
        spacing={1}
        style={{
          backgroundColor: "#875C74",
          overflowY: "hidden",
          width: "50vw",
        }}
      >
        {/* Buttons */}
        <span style={{ padding: "40px" }}>
          <Stack direction="row" spacing={2}>
            <ContainedButtons text="Normal view" width="200px" />
            <ContainedButtons text="Course view" width="200px" />
          </Stack>
        </span>

        {/* Table */}
        <DataTable cols={cols} rows={rows} />
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

const cols = [
  { field: "id", headerName: "ID", width: 10 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  { field: "link", headerName: "Link", width: 130 },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16, link: null },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 10, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 11, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 12, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 13, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 14, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 15, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 16, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 17, lastName: "Roxie", firstName: "Harvey", age: 65 },
];
