import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';



export default function DataTable(props) {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={props.tempRows}
        columns={props.tempColumns}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
