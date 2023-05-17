import { api, LightningElement, wire} from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import RESULT from '@salesforce/messageChannel/result__c';

import getSolutions from '@salesforce/apex/getSolutionRecordController.getSolutions';


export default class GetIntegrationSoltion extends LightningElement {

    @wire(MessageContext)
    messageContext;


    subscription = null;
  
    @api abc;

    @api answers;

    subscribeToMessageChannel() {

        console.log('IN SUBSCRIBE');
        this.subscription = subscribe(
        this.messageContext,
        RESULT,
        (message) => this.handleMessage(message)
      );
      // console.log('2nd Subscribe');
      // this.subscriptiontoanswer=subscribe(
      //   this.messageContext,
      //   ANSWER,
      //   (message) =>this.handleAnswer(message)
      // );
    }

    connectedCallback() {
      this.subscribeToMessageChannel();
    }

    handleMessage(message)
    {
      // .result.toString()
      console.log('Message from channel ->',message.message.toString());
      var name =message.message.toString();
      console.log(name);
      console.log("ANSWERS ================================= "+message.answers.toString());
      this.answers=message.answers.toString();
      
      getSolutions({ Name: name}).then(result => {
        console.log("sol: "+result[0]);
        this.abc = result[0];
      }).catch(error =>
        {
          console.log(error);
        });
    }

    passValues(){

      var col={
        res:this.abc,
        ans:this.answers
      };
      console.log(col.res);
      console.log(col.ans);
      const child=this.template.querySelector('c-pdf-file');
      child.update(col);

    }
    
}