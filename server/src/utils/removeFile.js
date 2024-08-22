import fs from 'fs';

const removeFile = async(filePath)=>{
    try{
        if(filePath){
            fs.unlinkSync(filePath)
        }
    }catch(err){
        console.log('Remove: '+err);
    }
}

export {
    removeFile
}