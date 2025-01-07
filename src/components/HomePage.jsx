import React, { useState, useEffect, useRef } from 'react'

export default function HomePage(props) {

    const { setFile, setAudioStream } = props;

    const [recordingStatus, setRecordingStatus] = useState('inactive')
    const [audioChunks, setAudioChunks] = useState([])
    const [duration, setDuration] = useState(0)

    const mediaRecorder = useRef(null)

    const mimeType = 'audio/webm'
    
    const startRecording = async () => {
         
        let tempStream
        console.log("Recording");

        try {
            
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio:true,
                video:false
            })

            tempStream = streamData;

        } catch (error) {
            console.log(error.message);
            return;
        }
        setRecordingStatus('recording')

        //Creating the new Media recorder instance using stream
        const media = new MediaRecorder(tempStream, { type:mimeType })
        mediaRecorder.current = media;

        mediaRecorder.current.start();

        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (event)=>{
            if(typeof event.data ==='undefined') return
            if(event.data.size === 0) return
            localAudioChunks.push(event.data)
        }
        setAudioChunks(localAudioChunks);
    }

    const stopRecording = async ()=>{
        setRecordingStatus('inactive');
        console.log('Stop Recording');

        mediaRecorder.current.stop()
        mediaRecorder.current.onstop = ()=>{
            const audioBlob = new Blob(audioChunks, { type:mimeType })
            setAudioStream(audioBlob)
            setAudioChunks([ ])
            setDuration(0);
        }
        
    }

    useEffect(()=>{
        if(recordingStatus=== 'inactive') return;

        const interval = setInterval(() => {
            setDuration(curr => curr+1)
        }, 1000);

        return ()=> clearInterval(interval);
    })

 /* return (
    <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20'>
        <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>React<span className='text-blue-400 bold '>Lator</span></h1>
        <h3 className='font-medium md:text-lg'>Record <span className='text-blue-400'>&rarr;</span> Transcribe <span className='text-blue-400'>&rarr;</span> Translate</h3> 
        <button onClick={recordingStatus==='recording'? stopRecording : startRecording} className='flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-xl'>
            <p className='text-blue-400'>{recordingStatus === 'inactive' ? 'Record': 'Stop recording'}</p>
            <div className='flex items-center gap-2'>
                {duration!=0 && (
                    <p className='text-sm'>{duration}s</p>
                    )}
            <i className={"fa-solid duration-200 fa-microphone " + (recordingStatus==='recording' ? "text-rose-300" : "")}></i>
            </div>
        </button>
        <p className='text-base'>Or <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'>upload <input onChange={(e)=>{
            const tempFile = e.target.files[0];
            setFile(tempFile)
        }} className='hidden' type="file" accept='.mp3,.wave'/></label> a mp3 file</p>
        <p className='italic text-slate-400'>Free now free forever</p>
    </main>
  )*/


    return (
        <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20 bg-black text-white'>
          <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>
            React<span className='text-red-400 bold'>Lator</span>
          </h1>
            <h3 className='font-medium md:text-lg'>
            Record <span className='text-red-400 animate-pulse'>&rarr;</span> 
            Transcribe <span className='text-red-400 animate-pulse'>&rarr;</span> 
            Translate
            </h3>
          <button 
            onClick={recordingStatus === 'recording' ? stopRecording : startRecording} 
            className='flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white'
          >
            <p>
              {recordingStatus === 'inactive' ? 'Record' : 'Stop recording'}
            </p>
            <div className='flex items-center gap-2'>
              {duration != 0 && (
                <p className='text-sm'>{duration}s</p>
              )}
              <i className={"fa-solid duration-200 fa-microphone " + (recordingStatus === 'recording' ? "text-red-300" : "")}></i>
            </div>
          </button>
          <p className='text-base'>
            Or <label className='text-red-400 cursor-pointer hover:text-red-600 duration-200'>
              upload <input 
                onChange={(e) => {
                  const tempFile = e.target.files[0];
                  setFile(tempFile);
                }} 
                className='hidden' 
                type="file" 
                accept='.mp3,.wave'
              />
            </label> a mp3 file
          </p>
          <p className='italic text-gray-500'>Free now free forever</p>
        </main>
    )
}
