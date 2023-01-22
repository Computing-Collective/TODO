import { Paper } from "@mui/material";
import { useEffect, useState } from "react";

export default function ExpandedView(props) {
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  const course = props.content.course;
  const date = new Date(props.content.dueDate);

  const dueDate =
    date.toString().split(" ")[0] +
    ", " +
    date.toISOString().substring(0, 10) +
    " " +
    formatAMPM(date);
  const title = props.content.title;
  const description = props.content.description;
  const completed = props.content.completed;

  return (
    <Paper
      elevation={4}
      style={{
        backgroundColor: "inherit",
        color: "white",
        width: "92%",
      }}
    >
      <div
        style={{
          marginLeft: "15px",
          marginBottom: "20px",
        }}
      >
        <h1>
          <span>{course}</span>
          <span style={{ marginLeft: "15px" }}>{title}</span>
        </h1>
        <h3>{dueDate}</h3>
        {description}
      </div>
    </Paper>
  );
}
