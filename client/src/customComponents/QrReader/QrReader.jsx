import React, { useEffect, useState } from 'react';
import {Html5QrcodeScanner} from "html5-qrcode";
import {useNavigate} from 'react-router-dom';
import { qrFileToHash } from '../../utils/client.utils';


function QrReader() {
    const [data,setData] = useState(null)
    const [hash,setHash] = useState(null)
    const navigate = useNavigate()

    const fetchHashFromQr = async(data)=>{
        const res = await qrFileToHash(data);
        if(res.data?.hash){
            setHash(prev=>res.data.hash)
        }
        else setHash(prev=>null)
    }
    useEffect(()=>{
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: {width: 250, height: 250} },
            /* verbose= */ false);
        scanner.render(onScanSuccess, onScanFailure);

        function onScanSuccess(decodedText, decodedResult) {
            setData(prev=>decodedText);
          }
        function onScanFailure(error) {
            console.warn(`Code scan error = ${error}`);
          }
    },[])
    useEffect(()=>{
        if(data)fetchHashFromQr(data);
    },[data])
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center space-y-2 bg-black'>
            <div id='reader' className='w-1/2 h-[500px] font-bold font-serif text-xl bg-white'></div>
            <div className='w-1/2'>
                {
                     <div className='w-full flex flex-row justify-evenly'>
                        <button className='w-[150px] border-4 border-gray-300 font-bold font-serif bg-black text-white shadow-md shadow-red-700 hover:shadow-yellow-400 rounded-sm text-2xl' onClick={()=>{navigate('/document-viewer',{state:data})}}>Go To Document</button>
                        <button className='w-[150px] border-4 border-gray-300 font-bold font-serif bg-black text-white shadow-md shadow-red-700 hover:shadow-yellow-400 rounded-sm text-2xl' onClick={()=>{navigate('/document-upload',{state:hash})}}>Go To Verifier</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default QrReader