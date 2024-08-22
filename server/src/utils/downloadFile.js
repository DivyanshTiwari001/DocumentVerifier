import axios from "axios";
import fs from "fs";

import { fileTypeFromBuffer } from 'file-type';

const downloadFile = async (fileUrl) => {
  try {
    // Fetch the file with the correct response type
    const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });

    // Detect the file type based on the content
    const type = await fileTypeFromBuffer(response.data);

    // Use the detected extension, or default to a generic one if not detected
    const ext = type ? type.ext : 'bin';

    // Define the output file path
    const outputFilePath = `./public/temp/qrFile.${ext}`;

    // Write the file to the specified location using the async API
    fs.writeFileSync(outputFilePath,response.data)

    // Return the output file path
    return outputFilePath;
  } catch (error) {
    console.error('Error downloading the file:', error);
    throw error;
  }
};

export {downloadFile};