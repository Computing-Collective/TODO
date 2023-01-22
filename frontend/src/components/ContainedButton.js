import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ContainedButtons(props) {
    return (
        <Button variant="contained" style={{ width: props.width }} >
            {props.text}
        </Button>
    );
}