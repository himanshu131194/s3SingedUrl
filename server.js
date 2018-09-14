const express  = require('express');
const uuid = require('uuid/v1');
const app = express();

const AWS = require('aws-sdk');


const s3Keys = {
    public : "AKIAJRGSXWIGPJRI4KIQ",
    private : "zYlUOt10Ddl6XOCQLNVWL2O58emFoW1wzGYLA6lL"
}

const s3 = new AWS.S3({
    accessKeyId: s3Keys.public,
    secretAccessKey: s3Keys.private,
    signatureVersion: 'v4',
    region: 'ap-south-1'
});

app.post('/api/upload', (req, res)=>{
  const key = uuid()+".png";
  var params = {
     Bucket: 'himanshu-testing-bucket',
     ContentType: 'png',
     Key: key
   };
  s3.getSignedUrl('putObject', params, function (err, url) {
    if(err)
       console.log(err);
    return res.send({

        key : key,
        url : url
    })
  });
})

app.use(express.static(__dirname+'/public'))

app.listen(4000, (err)=>{
     if(err)
        throw new Error("Not connected");
     console.log("server is running");
})
