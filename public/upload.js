var app = app || {};

(function(o){
   var multiplpe = false;
   var signedUrls = [];
   var globalData = "";
   var getSignedUrl = function(o){
     var xhttp = new XMLHttpRequest();
     xhttp.open("POST", o.url, true);
     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xhttp.send("filename="+o.data.name);
     xhttp.onreadystatechange = function() {
       if (this.readyState == 4 && this.status == 200){
           var res = JSON.parse(this.responseText);
           if(multiplpe){
              // if(signedUrls.length == ){
              //
              // }
           }else{
             signedUrls.push(res);
             sendToServer(res, o.data);
           }
       }
     };
   }

   var sendToServer = function(res, filetosend){
     console.log(filetosend);
     var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("uploaded successfully");
            globalData.success(this);
        }
      };
      xhttp.open("PUT", res.url , true);
      xhttp.setRequestHeader("Content-type", filetosend.type);
      xhttp.send(filetosend);
   }

   var uploadSingleFile = function(file){
       //sendToServer(file[0])
       console.log(getSignedUrl(file));
   }

   var uploadMultipleFiles = function(){

   }

   o.upload  = function(obj){
     globalData = obj;
     if(obj.multiplpe !== undefined && obj.multiplpe){
        //UPLOAD  MULTIPLE FILES
        multiplpe = true;
        uploadMultipleFiles(obj.data);
     }else{
       //UPLOAD SINGLE FILE
       uploadSingleFile(obj);
     }
     console.log(obj);
   }
}(app));
