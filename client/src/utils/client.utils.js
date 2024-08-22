import axios from "axios"

const baseUrl = "http://localhost:8000/api/v1/client"



const qrFileToHash = async(data)=>{
    const url = baseUrl + '/gen-qrfile-hash'
    const res = await axios.post(url,{url:data})
    return res.data;
}
const uploadFile = async(file,hash)=>{
    const url = baseUrl + '/upload-file'
    const form = new FormData();
    form.append('file',file);
    form.append('hash',hash);
    const res = await axios.post(url,form)
    return res.data;
}

export {
    uploadFile,
    qrFileToHash
}