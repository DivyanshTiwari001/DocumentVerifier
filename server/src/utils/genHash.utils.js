import {createHash} from 'node:crypto';
import {createReadStream} from 'fs';


const genHash = (filePath,algo='sha256')=>{
    return new Promise((resolve,reject)=>{
        const hash = createHash(algo);
        const readStream = createReadStream(filePath);
        readStream.on('data',(data)=>{
            hash.update(data);
        });
        readStream.on('error',(error)=>{
            reject(error);
        });
        readStream.on('end',()=>{
            const fileHash = hash.digest('hex');
            resolve(fileHash);
        });
    });

}

const compareHash = (hashOne,hashTwo)=>{
    return hashOne === hashTwo;
}

export {
    genHash,
    compareHash
}