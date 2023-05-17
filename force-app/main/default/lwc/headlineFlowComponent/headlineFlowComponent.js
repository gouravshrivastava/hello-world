import { api,LightningElement } from 'lwc';
import ANSWER from '@salesforce/messageChannel/answerchoice__c';
import { publish } from 'lightning/messageService';

export default class HeadlineFlowComponent extends LightningElement {
    @api result;
    showExport=false;
    showResult=false;
    answers;


    handleResultUpdate(event)
    {
        
        this.result=event.detail.array;
        console.log(this.result.length);
        console.log('Parent 15: '+this.result);
        this.answers=event.detail.answers;
        console.log('Parent answers : '+this.answers);
        this.template.querySelector('c-flow-result-component').updateVariables(this.result,this.answers);
        // console.log(this.result.length);
        // var dataObj = {message: this.answers};
        // publish(this.messageContext,ANSWER,dataObj);
        
        if(this.result.length>0)
        {
            // this.showResult=true;
            this.showExport=true;
        }
        if(this.result.length==1){
            // this.showResult=true;
            this.showExport=true;
            console.log("1 Solution Left");
            console.log(this.result);
            this.template.querySelector('c-flow-result-component').countResults(this.result[0]);
        }
        if(this.result.length==0){
            this.showResult=false;
            this.template.querySelector('c-flow-result-component').classList.remove('resultView');
            this.showExport=false;
            console.log('result.length==0');
            this.template.querySelector('c-flow-result-component').resetEvent();
            
        }
    }

    // passAnswers(event)
    // {
    //     this.answers=event.detail.toString();
    //     console.log(this.answers);
    //     var dataObj = {message: this.answers};
    //     publish(this.messageContext,ANSWER,dataObj);

    // }
}