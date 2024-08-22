import React,{useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


function DocumentViewer() {
  const location = useLocation();
  const url = location.state;
  const navigate = useNavigate();

  useEffect(()=>{
    if(!url)navigate('/')
  },[])

  return (
    <div>
        <iframe src={url} className='w-screen h-screen overflow-scroll'></iframe>
    </div>
  )
}

export default DocumentViewer