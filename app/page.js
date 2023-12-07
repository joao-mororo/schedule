"use client";

import moment from "moment";
import { Box, Button, ButtonGroup, Container } from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useEffect, useState } from "react";
import { DateCalendar, DatePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";
import styles from "./page.module.css";

export default function Home() {
  const [date, setDate] = useState(moment());
  const [note, setNote] = useState("");
  const formated_date = moment(date).format("YYYY-MM-DD");
  const icons = ["✅", "❌", "⚠️", "‼️", "❓", "💤", "⏩"];

  useEffect(() => {
    setNote(localStorage.getItem(formated_date) || "");
  }, [date]);

  const handleNotes = (text) => {
    setNote(text);
    localStorage.setItem(formated_date, text);
    if (text === "") {
      localStorage.removeItem(formated_date);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(`${text} copiado`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "2rem 0",
        }}
      >
        <Box>
          <h1>Agenda Online</h1>
        </Box>
        <Box>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            {icons.map((icon) => (
              <Button onClick={() => copyToClipboard(icon)}>{icon}</Button>
            ))}
          </ButtonGroup>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ display: "flex", height: "80vh" }}>
        <Box sx={{ width: "70%" }}>
          <textarea
            className={styles.notepad}
            value={note}
            onChange={(e) => handleNotes(e.target.value)}
          ></textarea>
        </Box>
        <Box sx={{ width: "30%", textAlign: "center" }}>
          <h1>{moment(date).format("DD/MM/YYYY")}</h1>
          <DateCalendar value={date} onChange={(newDate) => setDate(newDate)} />
          <Button variant="contained" onClick={() => setDate(moment())}>
            Hoje
          </Button>
        </Box>
      </Container>
    </LocalizationProvider>
  );
}
