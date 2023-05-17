import { LightningElement ,api, track} from 'lwc';
import sendPdf from '@salesforce/apex/PDFGenerateCtrl.generateandsendPdf';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';



export default class PdfFile extends NavigationMixin(LightningElement) {
    @api result;
    @api answers;
    email='';

    @api detail;

    @track isShowModal = false;
    @track isShowPdf=false;

    vfUrl='';

    @api
    update(col)
    {
        this.result=col.res;
        this.answers=col.ans;
        console.log(this.result.Name);
        console.log(this.answers);
        this.createPdf();
    }

    // @api
    // handleupdate(col)
    // {
    //     this.result=col['res'];
    //     this.answers=col['ans'];
    //     console.log(this.result);
    //     console.log(this.answers);
    // }

    // handleEmailChange(event){
    //     this.email = event.target.value;
    // }

    // showModalBox() {  
    //     this.isShowModal = true;
    // }

    // hideModalBox() {  
    //     this.isShowModal = false;
    // }
    hidePdfModalBox()
    {
        this.isShowPdf=false;
    }

    showPdfModalBox()
    {
        this.createPdf();
        this.isShowPdf=true;
    }
    navigateToVFPage() {
        // this[NavigationMixin.GenerateUrl]({
        //     type: 'standard__webPage',
        //     attributes: {
        //         url: this.vfUrl
        //     }
        // }).then(vfURL => {
        // window.open(vfURL);
        // });

        window.open(this.vfUrl);
    }

    createPdf()
    {
        console.log("in method");
        // + " choice : "+this.choice
        //var answerString='Source/Target for your integration : '+this.answers[0]+' /n Is Integration going to be Synchronised ? : '+this.answers[1]+' /n Type of Integration : '+this.answers[2]
        // this.result=this.detail.result;
        // this.answers=this.detail.answers;

        console.log("in createPdf : "+this.result.Id + " email : "+this.email+" answers: "+this.answers);
        
        this.vfUrl='/apex/SolutionDetailsPdf?id='+this.result.Id+'&answers='+this.answers;
        
        console.log(this.vfUrl);
        sendPdf({dataId : this.result.Id , email: this.email, answers: this.answers})
        .then(res=>{
            this.ShowToast('Success', res, 'success', 'dismissable');
            this.navigateToVFPage();
        })
        .catch(error=>{
            this.ShowToast('Error', error, 'error', 'dismissable');
            console.log(error);
        })

    }

    ShowToast(title, message, variant, mode){
        const evt = new ShowToastEvent({
            title: title,
            message:message,
            variant: variant,
            mode: mode
        });
        this.dispatchEvent(evt);
    }


    
}