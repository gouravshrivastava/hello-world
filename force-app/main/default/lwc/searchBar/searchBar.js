import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import SEARCH from '@salesforce/messageChannel/search__c';

export default class SearchBar extends LightningElement {

    @wire(MessageContext)
    messageContext;

    searchText;
    
    handleOnchange(event)
    {
        try{
        this.searchText = event.currentTarget.value;
        var sdata = {
             searchText : this.searchText
         }
        publish(this.messageContext, SEARCH, sdata);
        console.log(this.searchText);
        }
        catch(err)
        {
            console.log(err);
        }
    }
    handleSearch(event)
    {   
        var sdata = {
            searchText : this.searchText
        }
        console.log('search data',sdata);
        publish(this.messageContext, SEARCH, sdata);
        console.log('after publish');
    }
}