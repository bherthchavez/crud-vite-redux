import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { addTask, deleteTask, editTask } from "./taskSlice"

function App() {

  const taskList = useSelector((state) => state.task)
  const dispatch = useDispatch()

  const [btnEdit, setBtnEditAdd] = useState(false)
  const [task, setTask] = useState({
    id: '',
    name: ''
  })

  const hanndleAddTask = () => {

    if (btnEdit) {
      setTask({ id: '', name: '' })
      dispatch(editTask(task))
      setBtnEditAdd(!btnEdit)
    } else {
      setTask({ id: '', name: '' })
      dispatch(addTask(task))
    }
  }

  const hanndleEditTask = (id, name) => {
    setBtnEditAdd(true)
    setTask({ ...task, id, name })
  }

  const taskCard = () => taskList.map(task => (
    <div key={task.id} className="flex justify-between bg-slate-900 p-5 rounded">
      <h1 className="text-gray-300 text-2xl font-semibold">{task.name}</h1>
      <div className=" flex gap-4">
        <button
          onClick={() => hanndleEditTask(task.id, task.name)}
          className="text-gray-500 hover:text-slate-50">
          Edit
        </button>

        <button
          onClick={() => dispatch(deleteTask({ id: task.id }))}
          className="text-gray-500 hover:text-slate-50">
          Delete
        </button>
      </div>
    </div>
  ))



  return (
    <>
      <div className="h-screen bg-slate-950 grid place-items-center">
        <div className="grid gap-5 text-center">
          <h1 className="text-2xl font-semibold text-gray-300">
            Simple CRUD with Redux and Vite
          </h1>

          <div className="flex gap-2 items-center mx-auto">
            <input
              onChange={(e) => setTask({ ...task, name: e.target.value })}
              value={task.name}
              type="text"
              className="px-3 py-2 rounded font-medium text-lg"
            />
            <button
              onClick={hanndleAddTask}
              className="bg-slate-700 text-gray-300 px-5 py-3 rounded"
            >
              {btnEdit ? 'Update Task' : 'Add Task'} </button>
          </div>

          {taskList.length ? taskCard() : <p className="text-gray-300">No Task</p>}

        </div>
      </div>
    </>
  )
}

export default App
