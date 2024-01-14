import S3  from "aws-sdk/clients/s3.js"
import {v4 as uuid} from "uuid" 
export async function s3Uploadv2(file){
    const s3 =  new S3()

    const param = {
        Bucket: process.env.AWS_BUCKET_NAME, // Use AWS_BUCKET_NAME here
        Key: `uploads/${uuid()}-${file.originalname}`,
        Body: file.buffer
    }
    
    return await s3.upload(param).promise()
}