// import { S3 } from "aws-sdk"
// import { v4 as uuid } from "uuid" 
// export async function s3Uploadv2(file){
//     const s3 =  new S3()

//     const param = {
//         Bucket: process.env.AWS_BUCKET_NAME, // Use AWS_BUCKET_NAME here
//         Key: `uploads/${uuid()}-${file.originalname}`,
//         Body: file.buffer
//     }
    
//     return await s3.upload(param).promise()
// }

import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";

export async function s3Uploadv2(file) {
    const s3 = new AWS.S3();

    const param = {
        Bucket: process.env.AWS_BUCKET_NAME, // Use AWS_BUCKET_NAME here
        Key: `uploads/${uuid()}-${file.originalname}`,
        Body: file.buffer
    };
    
    try {
        const data = await s3.upload(param).promise();
        return data;
    } catch (error) {
        // Handle error appropriately
        throw new Error(`S3 upload failed: ${error.message}`);
    }
}

export default s3Uploadv2; // Exporting the function as default
