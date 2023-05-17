import { LightningElement ,api} from 'lwc';
import parsePdf from '@salesforce/apex/PdfToTextApex.parsePdf';
export default class UploadFileDemo extends LightningElement {

    @api
    myRecordId;

    get acceptedFormats() {
        return ['.pdf'];
    }

    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFile = event.detail.files[0];
        console.log(uploadedFile);
        alert(uploadedFile.name+"\n"+uploadedFile.body);
        parsePdf({file:uploadedFile})
        .then((result) => {

            console.log(result);
            
        })
        .catch((error) => {

            console.error(error);
            
        });
    }
}