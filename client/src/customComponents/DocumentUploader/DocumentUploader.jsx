import React, { useState,useEffect } from 'react'
import { uploadFile } from '../../utils/client.utils';
import { useLocation,useNavigate } from 'react-router-dom';



function DocumentUploader() {
  const [file,setFile] = useState(null);
  const [status,setStatus] = useState(null);
  const location = useLocation();
  const hash = location.state;
  const navigate = useNavigate(); 

  const uploadHandler = async(event)=>{
    event.preventDefault();
    const res = await uploadFile(file,hash);
    console.log(res);
    setStatus(prev=>res.data.matched);
  }

  useEffect(()=>{
    if(!hash)navigate('/')
  },[])

  return (
    <div className='w-screen h-screen flex flex-col items-center mt-3 gap-3'>
        <h3 className='text-4xl font-bold font-serif'>Upload your document for verification</h3>
        <div className='w-[500px] h-[200px] border-2 flex flex-col items-center'>
            <form onSubmit={uploadHandler} className='w-full h-full flex flex-col items-center gap-4'>
                <input type="file" name="document" id="document" className='w-full' onChange={(e)=>{
                    setFile(prev=>e.target.files[0]);
                }}/>
                <button type='submit' className='w-[100px] border-4 border-gray-300 font-bold font-serif bg-black text-white shadow-md shadow-red-700 hover:shadow-yellow-400 rounded-sm text-2xl'>Upload</button>
            </form>
            {
              status!==null && <div className='w-full flex flex-row justify-center text-2xl font-bold '>
                <h3>Status : <span className={(status===true)?'text-green-500':'text-red-600'}>{(status===true)?"Matched":"Not Matched"}</span></h3>
              </div>
            }
        </div>
    </div>
  )
}

export default DocumentUploader