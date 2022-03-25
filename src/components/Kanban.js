import './kanban.scss'
import {DragDropContext,Draggable,Droppable} from 'react-beautiful-dnd'
import { useState } from 'react'
import React from 'react';
import Card from '../card/Card'
import { useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, TextField, Typography } from '@material-ui/core'
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: '#FFFFFF' ,
      border: '9px solid #FFFFFF',
      boxShadow: theme.shadows[3],
      padding: theme.spacing(2, 4, 3),
    },
    button:{
        marginTop:'20px',
        marginBottom:'20px',
        background:'#0747A6'
    },
   
  }));
  
 function  Kanban() {
     const [data, setData]= useState([])
     const [loading,setLoading]=useState(true)
     const [error,setEroor]=useState(null)
     const classes = useStyles();
     const [open, setOpen] = React.useState(false);
     const [titles,setTitles]=useState('');
     const [descs,setDescs]=useState('');
     const navigate = useNavigate();
    let new_ticket;
     const handleOpen = () => {
       setOpen(true);
     };
   
     const handleClose = () => {
       setOpen(false);
     };
     const handelpost = () =>{
         axios.get(`${url}/block_0`)
         .then(res=>{
        new_ticket=res.data
        new_ticket.tasks.push({id:uuidv4(),title:titles,description:descs})
        console.log(new_ticket.tasks) 
        axios.put(`${url}/block_0`,new_ticket)
        .then(window.location.reload(true) )
        })
        
     }
     const url='http://localhost:3000/lists'
   useEffect(()=>{
       axios.get(url)
       .then(res=> res.data
        )
       .then(data=>
        {setData(data)
            setLoading(false)
        })
        .catch(err=>{
            setEroor(err.message)
            setLoading(false)
        })
   },[])
    const onDragEnd= async (result) =>{
if(!result.destination) return
const {source,destination}=result
if(source.droppableId !== destination.droppableId){
    const sourceColIndex = data.findIndex(e=>e.id === source.droppableId)
    const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)
    const sourceCol = data[sourceColIndex]
    const destinationCol=data[destinationColIndex]
    const sourceTask = [...sourceCol.tasks]
    const destinationTask = [...destinationCol.tasks]
    const [removed]=sourceTask.splice(source.index,1)
    destinationTask.splice(destination.index,0,removed)
    data[sourceColIndex].tasks=sourceTask
    data[destinationColIndex].tasks=destinationTask
    setData(data)
    let new_block=data[parseInt(result.source.droppableId[6])]
    let updated_block=data[parseInt(result.destination.droppableId[6])]

     axios.put(`${url}/${result.source.droppableId}`,new_block)
     .then(res=>{
      axios.put(`${url}/${result.destination.droppableId}`,updated_block)
     })
    
}
}
  return (  
    <DragDropContext onDragEnd={onDragEnd}>
        <header>
            <p>
                <strong>Kanban Board</strong> 
            </p>
            <Button className={classes.button} variant='contained'  onClick={handleOpen}>Create Ticket</Button>
            <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Create Ticket</h2>
            <p id="transition-modal-description">Fill the following information to create ticket</p><br/>
            <form>
                <Typography variant="h5" component="h5"  >Ticket title</Typography>
                <TextField variant='outlined' required value={titles} onChange={(e)=>setTitles(e.target.value)} >ticket title</TextField>
                <Typography variant="h5" component="h5">Ticket Description</Typography>
                <TextField variant='outlined' multiline required value={descs}  onChange={(e)=>setDescs(e.target.value)}>ticket description</TextField>
               <br/> <Button className={classes.button} onClick={handelpost} variant='outlined'>Create Ticket</Button>
            </form>
          </div>
        </Fade>
      </Modal>
        </header>
        <section className='kanban'>
            {loading && <div>Loading the board .....</div>}
            {error && <div>{error}</div>}
            { data &&
                data.map(section =>(
                    <Droppable key={section.id} droppableId={section.id}>
                        {(provided)=>(
                            <article {...provided.droppableProps} className='kanban_section' ref={provided.innerRef}>
                                <div className='kanban_section_title'>
                                    {section.title}
                                </div>
                                                                <div className='kanban_section_content'>
                                    {section.tasks.map((task,index)=>(
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                           {(provided,snapshot)=>(
                                               <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{...provided.draggableProps.style, opacity:snapshot.isDragging ? '0.5':'1'}}>
                                                    <Card>
                                                       <strong> {task.title}</strong><br/>
                                                        <Button color='default' variant='outlined' onClick={()=>{
                                navigate(`/detail/${task.id}/${task.title}/${task.description}`)
                                                        }}>More</Button>
                                                    </Card>
                                               </div>
                                           )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    </div>
                                    </article>
                        )}
                        </Droppable>
                ))
            }
            </section>

    </DragDropContext>
  )
}
export default Kanban