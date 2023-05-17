import { LightningElement,api,wire } from 'lwc';
import  getSearchRecords  from '@salesforce/apex/getMetadata.getSearchRecords';
import  getRecords  from '@salesforce/apex/getMetadata.getRecords';
export default class VideoCards extends LightningElement {
    
    @api searchkey;
    @api metaDataRecords;
    countRecords=0;
    
    // @wire(getSearchRecords,{ searchKey: '$searchkey' }) wiredSolutions({data,error}){

    // if(data){
    //     this.metaDataRecords = data;
    // } else if (error) {
    // console.log(error);
    // }
    // }

    handleOnclick(event)
    {

        var id = event.currentTarget.dataset.id.toString();
        var arr = this.metaDataRecords.filter(record => record.Id == id);
        console.log(typeof this.metaDataRecords);
        var vdata = arr[0];
        console.log(vdata);
        const clickEvent = new CustomEvent('clickevent', { detail: vdata});
        this.dispatchEvent(clickEvent);
        console.log(vdata);
    }

    connectedCallback()
    {
        getRecords()
            .then(result => {
                this.metaDataRecords = result;
                this.countRecords=result.length;
                console.log(this.countRecords);
            })
            .catch(error => {
                console.log(error);
            });
       
    }

    fetchRecords()
    {
        console.log('in FetchRecords');
        getSearchRecords({searchkey: this.searchkey})
            .then(result => {
                this.metaDataRecords = result;
                
                this.countRecords=result.length;
                console.log(this.countRecords);
            
            })
            .catch(error => {
                console.log(error);
            });
    }

    @api handleValueChange(searchkey) {
        this.searchkey=searchkey;
        this.fetchRecords();
    }
   
}