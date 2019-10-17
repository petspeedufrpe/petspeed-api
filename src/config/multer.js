const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const storageS3 = new aws.S3({
    accessKeyId:'AKIAZA47P5KYWWC2CDVF',
    secretAccessKey:'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'
});

const storageTypes = {
    local: multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null,path.resolve(__dirname,"..","..","tmp","uploads"));
        },
        filename: (req,file,cb) => {
            crypto.randomBytes(16,(err,hash)=>{
                if(err) cb(err);
                file.key = `${hash.toString('hex')}-${file.originalname}`
                cb(null,fileName);
            });
        }
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket:'uploadpetspeed',
        contentType:multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req,file,cb)=> {
            crypto.randomBytes(16,(err,hash)=>{
                if(err) cb(err)
                const fileName = `${hash.toString('hex')}-${file.originalname}`
                cb(null,fileName);
            });
        }
    }),
}
module.exports = {
    dest: path.resolve(__dirname, '..','..','tmp','uploads'),
    
    storage: storageTypes["s3"],

    fileFilter: (req,file,cb) => {
        const allowedMimes = [
            'images/jpeg',
            'images/pjpeg',
            'image/png'
        ];
        if(allowedMimes.includes(file.mimeType)){
            cb(null,true);
        } else{
            new Error('Invalid File Type')
        }
    },
}