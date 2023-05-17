import { LightningElement,track } from 'lwc';
import invokeCreateTrigger from '@salesforce/apex/CreateTrigger.invokeCreateTrigger'
const options = [
    {'label':'Before Insert','value':'Before_Insert__c'},
    {'label':'Before Delete','value':'Before_Delete__c'},
    {'label':'Before Update','value':'Before_Update__c'},
    {'label':'After Update','value':'After_Update__c'},
    {'label':'After Undelete','value':'After_Undelete__c'},
    {'label':'After Insert','value':'After_Insert__c'},
    {'label':'After Delete','value':'After_Delete__c'}
];

export default class CreateTriggerUtility extends LightningElement {

    @track selectedValueList = [];
    @track selectedValue;
    @track options = options;
    ObjectApiName;
    @track isLoading = false;
    mapData = { Before_Insert__c : 'false' ,
                Before_Delete__c :'false',
                After_Update__c:'false',
                After_Undelete__c:'false', 
                After_Insert__c:'false',
                After_Delete__c:'false',
                Before_Update__c:'false',
                ObjectApiName:'EntityDefinition'

            };
    handleSelectOptionList(event){
        this.selectedValueList = event.detail;
    }
    handleChange(event)
    {
        const selectedOptionsList = event.detail.value;
        this.selectedValueList = selectedOptionsList;
        console.log(selectedOptionsList);
    }
    handlesearchvalue(event)
    {
        
        if(event.detail.data.length)
            this.ObjectApiName = event.detail.data[0].DeveloperName;
        else 
            this.ObjectApiName = null;
    }
    handleOnclick()
    {
        if(this.ObjectApiName == null){
            window.alert('Please select an Object');
            return;
        }
        this.mapData.ObjectApiName = this.ObjectApiName;
        this.selectedValueList.forEach((data)=>{
            this.mapData[data] = 'true';
        })
        const mpdata = this.mapData;
        this.isLoading = true;
        console.log(this.isLoading);
        invokeCreateTrigger({mpdata})
            .then(result => {
                this.isLoading = false;
                console.log(this.isLoading);
                window.alert(result);
                this.ObjectApiName =null;
                this.selectedValueList =[];
                
            })
            .catch(error => {
                console.log(error);
            });
            console.log(this.isLoading);
            this.isLoading = false;
    }
}