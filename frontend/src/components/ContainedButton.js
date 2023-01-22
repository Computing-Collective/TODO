import * as React from "react";
import Button from "@mui/material/Button";

export default function ContainedButtons(props) {
  return (
    <Button
      variant="contained"
      onClick={() => {
        console.log("hi");
      }}
      style={{ width: props.width }}
    >
      {props.text}
    </Button>
  );
}
