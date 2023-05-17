import { LightningElement,api,wire} from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import VIDEO from '@salesforce/messageChannel/video__c';
import EmailPreferencesStayInTouchReminder from '@salesforce/schema/User.EmailPreferencesStayInTouchReminder';

export default class Videos extends LightningElement {

    @wire(MessageContext)
    messageContext;

    subscription = null;
    linkTemplate = 'https://www.youtube.com/embed/';
    videoLink;
    videoTitile;
    

    subscribeToMessageChannel() {
        this.subscription = subscribe(
        this.messageContext,
        VIDEO,
        (message) => this.handleMessage(message)
      );
    }

    connectedCallback() {
      this.subscribeToMessageChannel();
    }
    handleMessage(message)
    {
        console.log('message recived', message);
        var rawlink = message.VideoLink__c.toString();
        console.log(rawlink);
        var st = rawlink.split('/');
        var sd = st[st.length-1];
        console.log(sd);
        this.videoLink = this.linkTemplate + sd;
        console.log(this.videoLink);

        this.videoTitile = message.Title__c.toString();
    }
}