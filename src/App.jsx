import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid';
import { addTask, deleteTask, updateTask } from "./taskSlice";

function App() {
  const taskList = useSelector((state) => state.task)
  const dispatch = useDispatch()

  const [updateId, setUpdateId] = useState(null)
  const [valueTask, setValueTask] = useState({
    id: uuidv4(),
    name: ''
  })

  const haddleAddTask = () => {
      setValueTask({ id: uuidv4(), name: '' })
      dispatch(addTask(valueTask))
  }

  const handdleUpdateTask = ()=>{
    dispatch(updateTask(valueTask))
    setUpdateId(null)
    setValueTask({ id: uuidv4(), name: '' })
  }

  const handdleEdit = (id, name) => {
    setValueTask({ id, name })
    setUpdateId(id)
  }

  const hanndleDeleteTask = (id)=>{
    dispatch(deleteTask({ id }))
    setValueTask({ id: '', name: '' })
    setUpdateId(null)
  }

  const renderCardTask = () => taskList.map(task => (
    <div key={task.id} className="flex justify-between p-4 bg-slate-800  rounded">
      <div>
      <h1 className="text-gray-300 text-left text-lg">{task.name} </h1>
      <p className="text-gray-500 text-left text-xs">{task.id}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => handdleEdit(task.id, task.name)}
          className="text-gray-400 hover:text-gray-100 ">
          Edit</button>
        <button
          onClick={() => hanndleDeleteTask(task.id)}
          className="text-gray-400 hover:text-gray-100 ">Delete</button>
      </div>
    </div>
  ))



  return (
    <>
      <div className="h-screen bg-slate-950">
        <div className="grid justify-center gap-4 pt-20 text-center">
          <div className="flex gap-2">
            <input
              type='text'
              onChange={(e) => setValueTask({ ...valueTask, name: e.target.value })}
              value={valueTask.name}
              className="py-2 px-3 font-medium rounded  focus:outline-none"
            />
            <button
              onClick={updateId ? handdleUpdateTask  : haddleAddTask}
              className="bg-slate-700 w-32 text-gray-300  py-1 rounded hover:bg-slate-800"
            >
              {updateId ? 'Update Task' : ' Add Task'}
            </button>
          </div>

          {taskList.length ? renderCardTask() : <p className="text-gray-300 pt-5"> No Task </p>}
        </div>
      </div>
    </>
  )
}

export default App
