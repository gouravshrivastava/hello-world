import {LightningElement, api, wire} from 'lwc';
import getRecords from '@salesforce/apex/getMetadata.getRecords';
import {publish, MessageContext, subscribe} from 'lightning/messageService';
import RESULT from '@salesforce/messageChannel/result__c';
import VIDEO from '@salesforce/messageChannel/video__c';



export default class VideoCards extends LightningElement {

    @wire(MessageContext)
    messageContext;

    subscription = null;
    relatedVideos;
    videos;
    metaDataRecords;
    searchText;
    customModalPopup = false;
    linkTemplate = 'https://www.youtube.com/embed/';
    videoLink;
    videoTitile;

    @wire(getRecords) wiredSolutions({data,error}) {

        if (data) {
            this.videos = data;
            this.metaDataRecords = data;
        } else if (error) {
            console.log(error);
        }
    }

    handleOnclick(event) {

        
        console.log(this.customModalPopup);

        var id = event.currentTarget.dataset.id.toString();
        var arr = this.videos.filter(record => record.Id == id);
        var rawlink = arr[0].VideoLink__c.toString();
        var tempArr = rawlink.split('/');
        var link = tempArr[tempArr.length-1];
        this.videoLink = this.linkTemplate + link;
        console.log(this.videoLink);
        this.videoTitile = arr[0].Title__c.toString();
        this.showPopup();

    }
    handleOnchange(event)
    {
        this.searchText = event.currentTarget.value.toString();
        console.log(this.searchText,this.searchText.length );
        if(this.searchText.length === 0)
        {
            this.videos = this.metaDataRecords;
        }
        else{
        this.filterRecords(this.searchText.toLowerCase());
        }
    }

    filterRecords(searchKey)
    {
        console.log(searchKey);
        var arr = this.videos.filter(record  => record.Title__c.toLowerCase().includes(searchKey));
        this.videos = arr;
        console.log(arr);
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
            this.messageContext,
            VIDEO,
            (message) => this.handleMessage(message)
        );
        console.log('channel subscribeed');
    }

    connectedCallback() {
        console.log('connected');
        this.subscribeToMessageChannel();

    }

    handleMessage(message) {
        var keywords = message.data;
        this.relatedVideos = this.metaDataRecords.filter(record => keywords.includes(record.Keyword__c));
        
      


    }
    showPopup()
    {
        this.customModalPopup = true;
    }
    hidePopup()
    {
        this.customModalPopup = false;
    }
    
    

}