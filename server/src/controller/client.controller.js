import { removeFile } from "../utils/removeFile.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { genHash,compareHash } from "../utils/genHash.utils.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { downloadFile } from "../utils/downloadFile.js";

const QrLinkFileHashGenerator = asyncHandler(async(req,res)=>{
    const {url} = req.body;
    if(!url) {
        throw new ApiError(400,"Bad Request");
    }
    const localPath = await downloadFile(url);
    const fileHash = await genHash(localPath);

    removeFile(localPath)
    
    return res
    .status(200)
    .json(new ApiResponse(200,{'hash':fileHash},'file successfully fetched from qr'))
})

const fileVerifier = asyncHandler(async(req,res)=>{
    const localPath = req.file?.path;
    const {hash} = req.body;

    if(!localPath || !hash){
        throw new ApiError(400,'Bad Request')
    }
    const newHash = await genHash(localPath);
    
    const verified = await compareHash(newHash,hash);
    
    removeFile(localPath)
    
    return res
    .status(201)
    .json(new ApiResponse(201,{matched:verified},""))
})


export {
    QrLinkFileHashGenerator,
    fileVerifier
}