import './kanban.scss'
import {DragDropContext,Draggable,Droppable} from 'react-beautiful-dnd'
import mockData from '../../src/mockData'
import { useState } from 'react'
import Card from '../card/Card'
import useFetch from '../useFetch'
import { useEffect } from 'react'
import axios, { Axios } from 'axios'
 function  Kanban() {
     const [data, setData]= useState([])
     const [all,setAll]=useState([]) 
    //  const address=process.env.JSON_ADDRESS;
    //  console.log(address)
   useEffect(()=>{
       axios.get('http://localhost:3000/lists')
       .then(res=> res.data)
       .then(data=>setData(data))
      
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
    console.log("dragged block", result.source.droppableId)
    console.log("dropped block",result.destination.droppableId)
    console.log("dragged item",result.draggableId)
    let new_block=data[parseInt(result.source.droppableId[6])]
     axios.put(`http://localhost:3000/lists/${result.source.droppableId}`,new_block)
     let updated_block=data[parseInt(result.destination.droppableId[6])]
     axios.put(`http://localhost:3000/lists/${result.destination.droppableId}`,updated_block)
}
}
  return (    
    <DragDropContext onDragEnd={onDragEnd}>
        <div className='kanban'>
            {
                data.map(section =>(
                    <Droppable key={section.id} droppableId={section.id}>
                        {(provided)=>(
                            <div {...provided.droppableProps} className='kanban_section' ref={provided.innerRef}>
                                <div className='kanban_section_title'>
                                    {section.title}
                                </div>
                              
                                <div className='kanban_section_content'>
                                    {section.tasks.map((task,index)=>(
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                           {(provided,snapshot)=>(
                                               <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{...provided.draggableProps.style, opacity:snapshot.isDragging ? '0.5':'1'}}>
                                                    <Card>
                                                        {task.title}
                                                    </Card>
                                               </div>
                                           )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                    </div>
                                    </div>
                        )}
                        </Droppable>
                ))
            }
            </div>
    </DragDropContext>
  )
}

export default Kanban