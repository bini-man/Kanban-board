import {v4 as uuidv4} from 'uuid'

const mockData =[
    {
        id:'block_1',
        title: 'Product Backlog',
        tasks:[
            {
                id:'1',
                title:'Learn Javascript'
            },
            {
                id:uuidv4(),
                title:'Learn Git'
            },
            {
                id:uuidv4(),
                title:'Learn Pyton'
            },
        ]
    },
    {

    
    id:'block_2',
        title: 'To do',
        tasks:[
            {
                id:uuidv4(),
                title:'Learn Javascript'
            },
            {
                id:uuidv4(),
                title:'Learn Git'
            },
            {
                id:uuidv4(),
                title:'Learn Pyton'
            },
        ]
    },
    {
        id: 'block_3',
        title:' In Progress',
        tasks:[
            {
                id:uuidv4(),
                title:'Learn css'
            },
            {
                id:uuidv4(),
                title:'Learn HTML'
            },
            {
                id:uuidv4(),
                title:'Learn scss'
            },
        ]
    },
    {
        id: 'block_4',
        title:' Completed',
        tasks:[
            {
                id:uuidv4(),
                title:'Learn React'
            },
            {
                id:uuidv4(),
                title:'Learn Goland'
            },
            {
                id:uuidv4(),
                title:'Learn AI'
            },
        ]
    }
]
export default mockData