import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString !== null) { 
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4() , todo, isCompleted: false }])
    setTodo("")
    saveToLS()
   
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS()
   
  }

  const handleDelete = (e, id) => { 
    let newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id)
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 bg-violet-100 rounded-xl p-5">
        <div>
          <div className="add-todo mb-5">
            <h2 className='font-bold text-xl'>Add ToDo</h2>
            <div>
              <input onChange={handleChange} value={todo} type="text" className='w-1/2 border-2 border-violet-300 rounded-md outline-0 px-2' />
              <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 text-white px-4 py-1 rounded-lg ms-5 cursor-pointer'>Add</button>
            </div>

          </div>
          <div className="your-todos">
            <h2 className='font-bold text-xl'>Your ToDos</h2>
            <div className="todos">
              {todos.length === 0 && <div className='text-center text-violet-800 font-bold'>No ToDo</div>}
              {todos.map(item => (
                <div key={item.id} className="todo flex">
                  <input type="checkbox" onChange={handleCheckbox} value={item.isCompleted} name={item.id} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  <div className="buttons">
                    <button onClick={(e)=> { handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 text-white px-4 py-1 rounded-lg ms-1 cursor-pointer'>Edit</button>
                    <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 text-white px-4 py-1 rounded-lg ms-1 cursor-pointer'>Delete</button>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default App
