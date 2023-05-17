import { wire,LightningElement } from 'lwc';
import  {subscribe, MessageContext } from 'lightning/messageService';

import SUBSOLUTIONID from '@salesforce/messageChannel/subSol__c';
import getFinalSolution from '@salesforce/apex/getSolutionRecordController.getFinalSolution';


export default class FinalSolutionTile extends LightningElement {

    @wire(MessageContext)
    messageContext;

    finalSolutionName;
    prerequisites;
    limitation;
    approachLimitation;
    tools;

    subscription = null;

    connectedCallback() {

      console.log('within connected call ');
        this.subscribeToMessageChannel();
        
        // this.finalSolution='Test';
      }

    subscribeToMessageChannel() {

      console.log('within final sol subscribe');
        this.subscription = subscribe(
        this.messageContext,
        SUBSOLUTIONID,
        (message) => this.handleMessage(message)
      );
      console.log('after final sol subscribe');
    }

    handleMessage(message)
    {
        //console.log(typeof message);
        // var finalSol = message.result.toString();
        console.log('Message from SubSolution channel -> ',message.message);
        if(message.message==null){
          this.finalSolutionName=null;
        }else{
        getFinalSolution({ subSolutionId: message.message}).then(result => {
        console.log(result[0]);
         var data= result[0];
        this.finalSolutionName = data.Name;
        this.limitation=data.Limitation__c;
        // this.approachLimitation=data.Approach_Limitation__c;
        this.prerequisites=data.Prerequisites__r;
        console.log('Prerequisites are '+this.prerequisites );
        this.tools=data.Tools__r;
        console.log('Tools are :'+this.tools);

        }).catch(error =>
          {
            console.log(error);
          });
          console.log('after final solution call');
        }
    }



}