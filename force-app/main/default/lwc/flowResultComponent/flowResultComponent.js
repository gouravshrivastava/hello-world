import { api, LightningElement,wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import RESULT from '@salesforce/messageChannel/result__c';

export default class FlowResultComponent extends LightningElement {

    heading=""
    subheading="Please answer atleast one of the questions.";
    scrollMessage=false;

    @wire(MessageContext)
    messageContext;

    @api result;
    @api answers;
    showResult=false;

    handleOnClick(event)
    {
        this.scrollMessage=true;
        this.subheading="Please scroll below to view details.";
        var id = event.currentTarget.dataset.id.toString();
        var data=id.trim();
        var dataObj = {message: data,answers: this.answers};
        console.log(id);
        console.log(data.toString());
        console.log(this.answers);
        console.log(dataObj);
        publish(this.messageContext, RESULT, dataObj);
    }

    //if only 1 solution is left
    @api countResults(res)
    {
        this.showResult=true;
        this.scrollMessage=true;
        this.subheading="Please scroll below to view details.";
        console.log('CountRecords : '+res);
        this.result=[];
        this.result.push(res);
        var data=res.toString().trim();
        var dataObj = {message: data,answers: this.answers};
        console.log('In countResults : ',this.result[0]);
        publish(this.messageContext, RESULT, dataObj);
    }
    @api resetEvent()
    {
            this.showResult=false;
            this.scrollMessage=false;
            this.result=[];
            var dataObj = {message: this.result,answers: this.answers};
            console.log('In Reset Event : ',this.result);
            publish(this.messageContext, RESULT, dataObj);
    }

    @api updateVariables(result,answers)
    {
        this.showResult=true;
        this.result=result;
        if(this.result.length==1)
        {
            this.heading="Suggested Integration Design Pattern";
            this.subheading="";
            console.log("=====================FLOW RESULT=====================");
            console.log(this.result[0].length==0);
            if(this.result[0].length==0)
            {
                this.showResult=false;
                console.log("ShowResult========================="+this.showResult);
            }

        }
        else if(this.result.length==0)
        {
            
            this.subheading="Please answer atleast one of the questions.";
            this.heading="";
        }
        else if(this.result.length>1)
        {
            this.heading="Suggested Integration Design Patterns";
            this.subheading="Please select one of the design patterns to know more about them.";
        }
        if(answers[0]=='')
        {
            answers[0]='N/A'
        }
        if(answers[1]=='')
        {
            answers[1]='N/A'
        }
        if(answers[2]=='')
        {
            answers[2]='N/A'
        }
        var answerString='<div style="font:13pt;"><b>Source/Target for your integration : </b>'+answers[0]+' <br/><hr/><b> Is Integration going to be Synchronised ? : </b>'+answers[1]+' <br/><hr/><b> Type of Integration : </b>'+answers[2]+'</div>'
        this.answers=answerString;
        console.log(this.answers);
    }
}