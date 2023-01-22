import { Paper } from "@mui/material";
import * as React from "react";

export default function ExpandedView(props) {
  const course = props.content.course;
  const dueDate = props.content.dueDate;
  // console.log(props.content.dueDate);
  // const date = new Date(props.content.dueDate);
  // const dueDate = date.toISOString();
  // const dueDate = new Date(props.content.dueDate).toISOString();
  const title = props.content.title;
  const description = props.content.description;
  const completed = props.content.completed;
  return (
    <Paper
      elevation={4}
      style={{
        backgroundColor: "inherit",
        color: "white",
      }}
    >
      <h1>
        {course} - {dueDate}{" "}
      </h1>
    </Paper>
  );
}
