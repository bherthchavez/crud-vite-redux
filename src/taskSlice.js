import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {
        id: '1',
        name: 'Clean Toilet'
    },
    {
        id: '2',
        name: 'Clean Kitchen'
    }
]

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload)
        },
        updateTask: (state, action) => {
            const { id, name } = action.payload
            const existingTask = state.find(task=> task.id === id)
            if(existingTask){
                existingTask.name = name
            }
        },
        deleteTask: (state, action) => {
            const { id } = action.payload
            const existingTask = state.find(task=> task.id === id)
            if(existingTask){
                return state.filter(task=> task.id !== id)
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { addTask, updateTask, deleteTask } = taskSlice.actions

export default taskSlice.reducer