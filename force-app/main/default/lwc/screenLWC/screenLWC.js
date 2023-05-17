import { api, LightningElement,wire} from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import RESULT from '@salesforce/messageChannel/result__c';

export default class ScreenLWC extends LightningElement {
    @wire(MessageContext)
    messageContext;
    
    @api approach;
    cons = 'hello';

    connectedCallback(){
        console.log('approach', this.approach);
        const data = {
            result : this.approach.toString()
        };
        publish(this.messageContext, RESULT, data);

    }
}