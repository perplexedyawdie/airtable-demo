import axios from "axios";
import * as filestack from 'filestack-js';
import formidable from 'formidable'
import fs from 'fs'
export default (req, res) => {

    if (req.method === 'POST') {
       
        var form = new formidable.IncomingForm({keepExtensions: true});
        form.parse(req, function (err, fields, files) {
            fs.readFile(files.file.path, function (err, data) {
                filestack.init(process.env.NEXT_PUBLIC_API_KEY).upload(data)
            .then(resp => {
                res.status(200).send(resp)
            })
            .catch(err => {
                console.log(err)
            });
              })
            
       
        });
        
        

    } else {
        // Handle any other HTTP method

    }

}

export const config = {
    api: {
      bodyParser: false,
    },
  }
