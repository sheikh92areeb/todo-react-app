import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
	const [showFinished, setShowFinished] = useState(true)
	const [todo, setTodo] = useState("")
	
	const [todos, setTodos] = useState(() => {
		const storedTodos = localStorage.getItem("todos");
		return storedTodos ? JSON.parse(storedTodos) : [];
	});

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const toggleFinished = () => {
		setShowFinished(!showFinished)
	}

	const handleAdd = () => {
		setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
		setTodo("")
	}

	const handleEdit = (e, id) => {
		let t = todos.filter(item => item.id === id)
		setTodo(t[0].todo)
		let newTodos = todos.filter(item => item.id !== id)
		setTodos(newTodos)
	}

	const handleDelete = (e, id) => {
		let newTodos = todos.filter(item => item.id !== id)
		setTodos(newTodos)
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
	}

	return (
		<>
			<Navbar />
			<div className="w-[90%] mx-auto md:w-3/2 lg:w-1/2 container my-5 bg-violet-100 rounded-xl p-5">
				<div className='w-full'>
					<h1 className='text-xl sm:text-2xl font-bold text-violet-500 text-center mb-4'>aTask | Your Tasks Manager</h1>
					<div className="add-todo mb-2 w-full border-b-2 border-violet-200 pb-3">
						<h2 className='font-bold text-lg mb-2'>Add ToDo</h2>
						<div className="flex mb-6">
							<input onChange={handleChange} value={todo} type="text" className='w-full bg-white border-2 border-violet-200 focus:border-violet-300 rounded-full outline-0 px-5 py-1' />
							<button onClick={handleAdd} disabled={todo.length < 3} className='bg-violet-800 disabled:cursor-not-allowed disabled:bg-violet-300 hover:bg-violet-950 text-white px-4 py-1 rounded-full ms-2 cursor-pointer'>Save</button>
						</div>
						<input onChange={toggleFinished} type="checkbox" checked={showFinished} id='show' />
						<label htmlFor="show" className='ms-3'>Show Finished</label>
					</div>
					<div className="your-todos">
						<h2 className='font-bold text-lg mb-2'>Your ToDos</h2>
						<div className="todos w-full">
							{todos.length === 0 && <div className='text-center text-lg text-violet-400 font-bold'>No ToDo in List</div>}
							{todos.map(item => {
								return (showFinished || !item.isCompleted) && (
									<div key={item.id} className="todo h-full flex justify-between mb-3 border-b-2 border-violet-200 pb-1">
										<div className="flex gap-4 w-[50%] sm:w-[70%]">
											<input type="checkbox" onChange={handleCheckbox} checked={item.isCompleted} name={item.id} />
											<div className={item.isCompleted ? "line-through text-violet-300" : ""}>{item.todo}</div>
										</div>
										<div className="buttons">
											<button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 text-white px-3 py-2 rounded-lg cursor-pointer'><FaEdit /></button>
											<button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 text-white px-3 py-2 rounded-lg ms-3 cursor-pointer'><AiFillDelete /></button>
										</div>
									</div>
								)
							})}
						</div>

					</div>

				</div>
			</div>
		</>
	)
}

export default App
