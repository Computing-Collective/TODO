import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TableContainer } from '@mui/material';



export default function DataTable(props) {
    return (
        <div style={{ height: '80vh', width: '100%' }}>
            <DataGrid
                rows={props.rows}
                columns={props.cols}
            />
        </div>
    );
}
