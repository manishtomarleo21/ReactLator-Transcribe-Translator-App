import React from 'react'

export const FileDisplay = (props) => {

    const { file, audioStream, handleAudioReset, handleFormSubmission } = props;

  return (
    /*<main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 sm:w-96 justify-center text-center pb-20 w-72 mx-auto max-w-full '>
        <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl '>Your <span className='text-blue-400 bold '>File</span></h1>
        <div className='flex mx-auto flex-col text-left my-4'>
            <h3 className='font-semibold'>Name</h3>
            <p>{file ? file?.name : 'Custom Audio'}</p>
        </div>
        <div className='flex items-center justify-between gap-4'>
            <button onClick={handleAudioReset} className='text-slate-400 hover:text-blue-600 duration-200'>Reset</button>
            <button onClick={handleFormSubmission} className=' specialBtn px-3 p-2 rounded-lg text-blue-400 flex items-center gap-2 font-medium'> 
                <p>Transcribe</p>
                <i className="fa-solid fa-pen-nib"></i>
            </button>
        </div>
    </main>*/
    <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 sm:w-96 justify-center text-center pb-20 w-72 mx-auto max-w-full bg-black text-white'>
  <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl'>
    Your <span className='text-red-400 bold'>File</span>
  </h1>
  <div className='flex mx-auto flex-col text-left my-4'>
    <h3 className='font-semibold'>Name</h3>
    <p>{file ? file?.name : 'Custom Audio'}</p>
  </div>
  <div className='flex items-center justify-between gap-4'>
    <button 
      onClick={handleAudioReset} 
      className='text-gray-400 hover:text-red-600 duration-200'
    >
      Reset
    </button>
    <button 
      onClick={handleFormSubmission} 
      className='specialBtn px-3 p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 font-medium'
    > 
      <p>Transcribe</p>
      <i className="fa-solid fa-pen-nib"></i>
    </button>
  </div>
</main>
  )
}
