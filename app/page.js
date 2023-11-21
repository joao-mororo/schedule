'use client'

import moment from 'moment';
import { Box, Button, Container } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useEffect, useState } from 'react'
import styles from './page.module.css'
import { DateCalendar, DatePicker } from '@mui/x-date-pickers';

export default function Home() {
  const [date, setDate] = useState(moment())
  const [note, setNote] = useState('')
  const date_format = 'YYYY-MM-DD'

  useEffect(() => {
    setNote(localStorage.getItem(moment(date).format(date_format)) || '')
  }, [date])

  const handleNotes = (text) => {
    setNote(text)
    localStorage.setItem(moment(date).format(date_format), text)
    if (text === '') {
      localStorage.removeItem(moment(date).format(date_format))
    }
  }

  console.log('render');

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Container maxWidth='lg' sx={{ display: 'flex', justifyContent: 'space-between', padding: '2rem 0' }}>
        <Box><h1>Agenda Online</h1></Box>
        <Box>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ display: 'flex', height: '80vh' }}>
        <Box sx={{ width: '70%' }}>
          <textarea className={styles.notepad} value={note} onChange={(e) => handleNotes(e.target.value)}></textarea>
        </Box>
        <Box sx={{ width: '30%', textAlign: 'center' }}>
          <h1>{moment(date).format('DD/MM/YYYY')}</h1>
          <DateCalendar value={date} onChange={(newDate) => setDate(newDate)} />
          <Button variant='contained' onClick={() => setDate(moment())}>Hoje</Button>
        </Box>
      </Container>
    </LocalizationProvider>
  )
}
