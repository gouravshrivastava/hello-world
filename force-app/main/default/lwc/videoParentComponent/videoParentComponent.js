import { api,LightningElement } from 'lwc';

export default class VideoParentComponent extends LightningElement {

    @api vlink;
    @api vtitle;
    @api searchkey;

    handleClick(event)
    {
        this.vlink=event.detail.VideoLink__c.toString();
        this.vtitle=event.detail.Title__c.toString();
        console.log(this.vlink);
        console.log(this.vtitle);
        var st = this.vlink.split('/');
        var sd = st[st.length-1];
        console.log(sd);
        this.vlink='https://www.youtube.com/embed/'+sd.toString();
        console.log(this.vlink);
        
    }

    displayData(event)
    {
            this.searchkey=event.detail;
            this.template.querySelector("c-video-list").handleValueChange(this.searchkey);
            console.log('Parent '+this.searchkey);
    }


}