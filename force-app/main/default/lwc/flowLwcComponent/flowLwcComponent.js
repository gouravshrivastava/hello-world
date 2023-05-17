import { wire,LightningElement } from 'lwc';
import {publish, MessageContext, subscribe} from 'lightning/messageService';
import VIDEO from '@salesforce/messageChannel/video__c';

export default class FlowLwcComponent extends LightningElement {


    @wire(MessageContext)
    messageContext;

    // declaration of variables start

    choice;
    a1=' ';
    a2=' ';
    a3=' ';
    result=[];
    videoKeywords=[];

    dict=
    {
        'Remote Processing Invocation : Request and Reply':['Salesforce to External System Yes Process Integration','Salesforce to External System Yes Data Integration'],
        'Remote Processing Invocation: Fire and Forget' :['Salesforce to External System No Process Integration'],
        'UI update based on data changes':['Salesforce to External System No Data Integration'],
        'Remote Call-In':['External System to Salesforce Yes Process Integration','External System to Salesforce No Process Integration','External System to Salesforce Yes Data Integration'],
        'Batch Data Synchronization':['External System to Salesforce No Data Integration'],
        'Data Virtualization':['Salesforce to External System No Virtual Integration' , 'Salesforce to External System Yes Virtual Integration']
    }


     // methods to send values to radiogroups
     get options1() {
        return [
            { label: 'Salesforce to External System', value: 'Salesforce to External System' },
            { label: 'External System to Salesforce', value: 'External System to Salesforce' },
        ];
    }
    get options2() {
        return [
            { label: 'Yes', value: 'Yes' },
            { label: 'No', value: 'No' },
        ];
    }
    get options3() {
        return [
            { label: 'Data Integration', value: 'Data Integration' },
            { label: 'Process Integration', value: 'Process Integration' },
            { label: 'Virtual Integration', value: 'Virtual Integration' }
        ];
    }


    answerChanged(event)
    {
        switch(event.target.dataset.id)
        {
            case "b1":
                {
                    this.a1=event.detail.value;
                    break;
                }
            case "b2":
                {
                        this.a2=event.detail.value;
                        break;
                }
            case "b3":
                {
                        this.a3=event.detail.value;
                        break;
                }
            default:
                console.log("Wrong Choice / Error");
        }
        this.choice=this.a1+' '+this.a2+' '+this.a3;
        this.choice=this.choice.trim();
        console.log("Choice : "+this.choice);
        this.result=[];
        this.videoKeywords=[];
        console.log("Result refreshed");
        this.findSolution();
        
    }

    findSolution()
    {
        for(var i in this.dict)
            {
                for(var j in this.dict[i])
                {
                    if(this.dict[i][j].includes(this.choice) && !this.result.includes(i))
                    {
                        this.result.push(i);
                        console.log(this.result);
                    }
                }
                
            }

        this.publishData();
    }

    publishData()
    {
             // adding keywords to array
             if(this.result.includes('Remote Processing Invocation : Request and Reply'))
             {
                 this.videoKeywords.push('Request');
             }
             if(this.result.includes('Remote Processing Invocation: Fire and Forget'))
             {
                 this.videoKeywords.push('Fire');
             }
             if(this.result.includes('UI update based on data changes'))
             {
                 this.videoKeywords.push('UI');
             }
             if(this.result.includes('Remote Call-In'))
             {
                 this.videoKeywords.push('Callin');
             }
             if(this.result.includes('Batch Data Synchronization'))
             {
                 this.videoKeywords.push('Batch');
             }
             if(this.result.includes('Data Virtualization'))
             {
                 this.videoKeywords.push('Data');
             }

        console.log(this.videoKeywords);
        //object to be published for video component
        var dictSend={'data':this.videoKeywords};
        console.log(dictSend);
        publish(this.messageContext,VIDEO,dictSend);

        //changes done for export functionality
        var answerList=[];
        answerList.push(this.a1);
        answerList.push(this.a2);
        answerList.push(this.a3);
        //changes done for export functionality

        console.log(answerList);

        const resultEvent=new CustomEvent('resultevent',{detail: {array:this.result,answers:answerList}});
        this.dispatchEvent(resultEvent);
    }


    handleResetClick()
    {
        var dataObj ='';
        this.a1=' ';
        this.a2=' ';
        this.a3=' ';
        this.choice='';
        this.result=[];
        this.videoKeywords=[];
        var answerList=[];
        answerList.push(this.a1);
        answerList.push(this.a2);
        answerList.push(this.a3);
        const resultEvent=new CustomEvent('resultevent',{detail: {array:this.result,answers:answerList}});
        
        this.dispatchEvent(resultEvent);
        publish(this.messageContext, SUBSOL, dataObj);    

        
    }

}