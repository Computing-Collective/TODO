import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataTable(props) {
  return (
    <div style={{ height: "80vh", width: "90%" }}>
      <DataGrid
        rows={props.rows}
        columns={[
          { field: "dueDate", headerName: "Due Date", type: "date", editable: true },
          { field: "course", headerName: "Course", editable: true },
          { field: "title", headerName: "Title", editable: true },
          {
            field: "description",
            headerName: "Description",
            description: "This column is not sortable.",
            sortable: false,
            flex: 1,
            // valueGetter: (params) =>
            //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
          },
          {
            field: "completed",
            headerName: "",
          },
        ]}
        sx={{
          backgroundColor: "#141204",
          color: "white",
          "& .MuiSvgIcon-root, .MuiTablePagination-root, .MuiSelect-select, .MuiTablePagination-actions":
            {
              color: "white",
            },
        }}
      />
    </div>
  );
}
