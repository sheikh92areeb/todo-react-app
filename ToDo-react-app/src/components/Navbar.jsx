import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between items-center bg-violet-800 text-white px-15 py-3'>
        <div className="logo">
            <span className='font-bold text-2xl'>aTask</span>
        </div>
        <ul className='flex gap-5'>
            <li className='cursor-pointer hover:font-bold'>Home</li>
            <li className='cursor-pointer hover:font-bold'>My Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
