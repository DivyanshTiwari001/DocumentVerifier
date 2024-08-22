import {Router} from 'express'
import { upload } from '../middleware/multer.middleware.js';
import { fileVerifier, QrLinkFileHashGenerator } from '../controller/client.controller.js';
import { downloadFile } from '../utils/downloadFile.js';

const router = Router();

router.route('/upload-file').post(upload.single("file"),fileVerifier)
router.route('/gen-qrfile-hash').post(QrLinkFileHashGenerator)
router.route('/test').get((req,res)=>{
    downloadFile("http://localhost:5173")
    res.send("Test ok");
})

export default router;