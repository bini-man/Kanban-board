import { Typography } from '@material-ui/core'
import React from 'react'
import { useParams } from 'react-router-dom';

function Detail() {
    let params = useParams();
    const ticket_id= params.id;
    const title=params.title;
    const desc=params.desc;
  return (
    <header>
      <Typography variant='h3' >Detail of the ticket you selected</Typography>  

      <Typography variant='h5'>Ticket ID:{ticket_id}</Typography>
      <Typography variant='h5'>Ticket Title:{title}</Typography>
      <Typography variant='h5'>Ticket Description:{desc}</Typography>

        </header>
  )
}

export default Detail