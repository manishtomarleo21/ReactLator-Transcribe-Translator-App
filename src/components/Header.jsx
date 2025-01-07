import React from 'react'

export const Header = () => {
  return (
     /*<header className='flex items-center justify-between gap-4 p-4'>
        <a href="/"><h1 className='font-medium'>React<span className='text-blue-400 bold'>Lator</span></h1></a>
        <a href="/" className='flex items-center gap-2 specialBtn px-3 text-sm py-2 rounded-lg text-blue-400'>
        <p>New</p>
        <i className="fa-solid fa-plus"></i>
        </a>
    </header>*/
    <header className='flex items-center justify-between gap-4 p-4 bg-black text-white'>
  <a href="/">
    <h1 className='font-medium'>
      React<span className='text-red-400 bold'>Lator</span>
    </h1>
  </a>
  <a 
    href="/" 
    className='flex items-center gap-2 specialBtn px-3 text-sm py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white'
  >
    <p>New</p>
    <i className="fa-solid fa-plus"></i>
  </a>
</header>
  )
}
