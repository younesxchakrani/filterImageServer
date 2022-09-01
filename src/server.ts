import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, lastOutput} from './util/util';
import fs from "fs";

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  app.get( "/filteredimage", async ( req, res ) => {
      let { image_url } = req.query;

      if (!image_url){
          return res.status(400).send('The image Url is required');
      }
      await filterImageFromURL(image_url);
      let filteredpath = lastOutput;
      res.sendFile(__dirname+filteredpath);

      //console.log(__dirname);
      let tmpDir:string = __dirname+"\\util\\tmp";
      //console.log(tmpDir);

      let tmpFilesArray:string[]=[];
      fs.readdir(tmpDir, function (err, files) {
          //handling error
          if (err) {
              return console.log('Unable to scan directory: ' + err);
          }
          //console.log("hello beginning");
          //listing all files using forEach
          files.forEach(function (file) {
              // Do whatever you want to do with the file
              //console.log(file);
              tmpFilesArray.push(tmpDir+"\\"+file);
          });
          //console.log("Array: "+tmpFilesArray+" END");
          deleteLocalFiles(tmpFilesArray);
      });

  } );
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();