import React, { useRef, useState, useEffect } from 'react'
import { Transcription } from './Transcription'
import { Translation } from './Translation'

export const Information = (props) => {

    const { output } = props;
    const [tab, setTab] = useState('transcription')
    const [translation, setTranslation] = useState(null)
    const [toLanguage, setToLanguage] = useState('Select Language')
    const [translating, setTranslating] = useState(null)

    const worker = useRef()

    useEffect(() => {
        if(!worker.current){
          worker.current = new Worker(new URL('../utils/translate.worker.js', import.meta.url), {
            type:'module'
          })
        }

        const onMessageRecieved = async (e)=>{

          switch (e.data.status) {
            case 'initiate':
              console.log('DOWNLOADING');
              break;
            case 'progress':
              console.log('LOADING');
              break;
            case 'update':
              setTranslation(e.data.output);
              console.log('RESULT');
              console.log(e.data.output);
              break;
            case 'complete':
              setTranslating(false);
              console.log('DONE');
              break;
          }
        }
      
        worker.current.addEventListener('message', onMessageRecieved)  
    
        return () => worker.current.removeEventListener('message', onMessageRecieved)
      
    })

    const textElement = tab === 'transcription' ? output.map( val => val.text) : translation || 'No Translation'

    const handleCopy = (textElement)=>{
      navigator.clipboard.writeText()
    }

    function handleDownload() {
      const element = document.createElement('a');
      const file = new Blob([textElement], {type:'text/plain'})
      element.href = URL.createObjectURL(file)
      element.download = `Reactlator_${(new Date()).toString()}.txt`
      document.body.appendChild(element)
      element.click()
    }

    function generateTranslation() {
      if( translating || toLanguage === 'Select Language'){
        return
      }

      setTranslating(true)

      // Limit payload size or check length of the text
      const textPayload = output.map((val) => val.text).slice(0, 100); 

      worker.current.postMessage({
        // text:output.map(val=>val.text),
        text: textPayload,
        src_lang:'eng_Latn',
        tgt_lang: toLanguage
      })
    }


 /* return (
    <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20 mx-auto max-w-prose w-full '>
        <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap'>Your <span className='text-blue-400 bold '>Transcription</span></h1>
        
        <div className='grid grid-cols-2 mx-auto bg-white shadow rounded-full overflow-hidden items-center'>
            <button onClick={()=>setTab('transcription')} className={'px-4 py-1 duration-200 ' + (tab==='transcription' ? ' bg-blue-300 text-white' : ' text-blue-400 hover:text-blue-600')}>Transcription</button>
            <button onClick={()=>setTab('translation')} className={'px-4 py-1 duration-200 ' + (tab==='translation' ? ' bg-blue-300 text-white' : ' text-blue-400 hover:text-blue-600')}>Translation</button>
        </div>

        <div className='my-8 flex flex-col'>
            {tab==='transcription' ? (
                <Transcription {...props} textElement={textElement}/>
                ) : (
                <Translation {...props} toLanguage={toLanguage} translating={translating} textElement={textElement} setTranslating={setTranslating} setTranslation={setTranslation} setToLanguage={setToLanguage} generateTranslation={generateTranslation}/>
              )}
        </div>

         <div className='flex items-center gap-4 mx-auto'>
            <button onClick={handleCopy} title='Copy' className='bg-white text-blue-300 px-2 aspect-square grid place-items-center rounded hover:text-blue-500 duration-200'> 
            <i className="fa-solid fa-copy"></i> </button>
            <button onClick={handleDownload} title='Download' className='bg-white text-blue-300 px-2 aspect-square grid place-items-center rounded hover:text-blue-500 duration-200'> 
            <i className="fa-solid fa-download"></i> </button>
         </div>   
    </main>
  )*/
    return (
      <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20 mx-auto max-w-prose w-full bg-black text-white'>
        <h1 className='font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap'>
          Your <span className='text-red-400 bold'>Transcription</span>
        </h1>
    
        <div className='grid grid-cols-2 mx-auto bg-black shadow rounded-full overflow-hidden items-center'>
          <button 
            onClick={() => setTab('transcription')} 
            className={'px-4 py-1 duration-200 ' + (tab === 'transcription' ? ' bg-red-500 text-white' : ' text-red-400 hover:text-red-600')}
          >
            Transcription
          </button>
          <button 
            onClick={() => setTab('translation')} 
            className={'px-4 py-1 duration-200 ' + (tab === 'translation' ? ' bg-red-500 text-white' : ' text-red-400 hover:text-red-600')}
          >
            Translation
          </button>
        </div>
    
        <div className='my-8 flex flex-col'>
          {tab === 'transcription' ? (
            <Transcription {...props} textElement={textElement} />
          ) : (
            <Translation 
              {...props} 
              toLanguage={toLanguage} 
              translating={translating} 
              textElement={textElement} 
              setTranslating={setTranslating} 
              setTranslation={setTranslation} 
              setToLanguage={setToLanguage} 
              generateTranslation={generateTranslation} 
            />
          )}
        </div>
    
        <div className='flex items-center gap-4 mx-auto'>
          <button 
            onClick={handleCopy} 
            title='Copy' 
            className='bg-black text-red-300 px-2 aspect-square grid place-items-center rounded hover:text-red-500 duration-200'
          >
            <i className="fa-solid fa-copy"></i>
          </button>
          <button 
            onClick={handleDownload} 
            title='Download' 
            className='bg-black text-red-300 px-2 aspect-square grid place-items-center rounded hover:text-red-500 duration-200'
          >
            <i className="fa-solid fa-download"></i>
          </button>
        </div>
      </main>
    )
}
