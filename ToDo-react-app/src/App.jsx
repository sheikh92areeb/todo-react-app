import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) { 
      setTodos(JSON.parse(todoString))
    } else {
      setTodos([])
    }
  }, [])

  useEffect(() => {
    console.log("Saving to LocalStorage:", todos) // Debugging
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleAdd = () => {
    if (todo.trim() === "") return;
    setTodos(prevTodos => {
      const updatedTodos = [...prevTodos, { id: uuidv4(), todo, isCompleted: false }];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
    setTodo("")
  }

  const handleEdit = (id) => {
    let selectedTodo = todos.find(item => item.id === id);
    if (!selectedTodo) return;
    setTodo(selectedTodo.todo);
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(item => item.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  }

  const handleDelete = (id) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(item => item.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo => 
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
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
                <div key={item.id} className="todo flex items-center gap-3">
                  <input type="checkbox" onChange={handleCheckbox} checked={item.isCompleted} name={item.id} />
                  <div className={item.isCompleted ? "line-through text-gray-500" : ""}>{item.todo}</div>
                  <div className="buttons">
                    <button onClick={() => handleEdit(item.id)} className='bg-violet-800 hover:bg-violet-950 text-white px-4 py-1 rounded-lg ms-1 cursor-pointer'>Edit</button>
                    <button onClick={() => handleDelete(item.id)} className='bg-violet-800 hover:bg-violet-950 text-white px-4 py-1 rounded-lg ms-1 cursor-pointer'>Delete</button>
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
