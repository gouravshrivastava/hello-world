import { LightningElement,api,wire,track } from 'lwc';
import OBJECTS from '@salesforce/apex/PDFController.getObjects';
import getVFOrigin from '@salesforce/apex/PDFController.getVFOrigin';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveDetails from '@salesforce/apex/PDFController.saveDetails';
// import getVfOrigin from '@salesforce/apex/PDFController.getVfOrigin';
// import setObjectName from '@salesforce/apex/PDFController.setObjectName';

export default class PdfToTextComponent extends LightningElement {

    
    //   variable declaration
        showStartButton=false;
        finalMessage;
        vfUrl;
        firstScreen=true;
        secondScreen=false;
        thirdScreen=false;
        withNoMatchingHeaders=false;
        withMatchingHeaders=false;
        progress=1;
        value='';
        valueInsertUpdate='';
        objectName='';
        showFrame=false;
        showMessage=false;
        receivedMessage='';
        vfOrigin='';
        error;
        splitMessage=[];
        columns=[];
        values=[];
        finalList=[];
        divColor='default';
        showBack=true;


    //      variable declaration end

        get options() {
            return [
                { label: 'Table with headers matching the ApiName of Columns', value: 'option1' },
                { label: 'Table with headers not matching the ApiName of Columns', value: 'option2' },
                { label: 'Invoice Pdf', value: 'option3' },
            ];
        }

        get optionInsertUpdate()
        {
            return[
                {label: 'Insert',value:'Insert'},
                {label: 'Update',value:'Update'},
            ];

        }

        objectOptions=[];
        
    @track data;
    @track TypeOptions;

	@wire(OBJECTS, {})
    WiredOBJECTS({ error, data }) {

        if (data) {
            try {
                this.data = data; 
                let options = [];
				
                for (var i in data) {
					// Here key will have index of list of records starting from 0,1,2,....
                    options.push({ label:data[i] , value: data[i]});

	                // Here Name and Id are fields from sObject list.
                }
                this.TypeOptions = options;
                
            } catch (error) {
                console.error('check error here', error);
            }
        } else if (error) {
            console.error('check error here', error);
        }

    }

    connectedCallback()
        {
            // this.vfUrl='/apex/PDFTextParser';
            getVFOrigin()
            .then(result => {
                this.vfOrigin = result;
                console.log(this.vfOrigin);
            })
            .catch(error => {
                this.error = error;
            });

            window.addEventListener("message", this.handleVFResponse.bind(this));
        }
    
        handleVFResponse(message) {
            console.log(this.vfOrigin);
            if (message.origin === this.vfOrigin) {
                this.receivedMessage = message.data.payload;
                console.log("===================="+this.receivedMessage);
                this.splitMessage=this.receivedMessage.split('#');
                console.log("++"+this.splitMessage);
                this.columns=this.splitMessage[0].split('<>');
                this.finalList.push(this.columns);
                for(var i=1;i<this.splitMessage.length;i++)
                {
                    var val=this.splitMessage[i].split('<>');
                    this.values.push(val);
                }
                console.log(this.values);
                this.finalList.push(this.values);
                this.showFrame=false;
                this.showToast("Data extracted successfully.",'success');

            }

        }

    handleOperationChange(event)
    {
        this.valueInsertUpdate=event.detail.value;
        console.log(this.valueInsertUpdate);
        this.vfUrl='/apex/PDFTextParser'+'?objectName='+this.objectName+'&operation='+this.valueInsertUpdate;
        console.log(this.vfUrl);
        if(this.valueInsertUpdate=='Update')
        {
            this.showMessage=true;
        }
        else if(this.valueInsertUpdate=='Insert')
        {
            this.showMessage=false;
        }
        if(this.objectName!='') 
            {
                this.showFrame=true;
            }


    }

        handleObjectSelect(event)
        {
            this.objectName=event.detail;
            console.log(this.objectName);
            this.progress=80;
            this.vfUrl='/apex/PDFTextParser'+'?objectName='+this.objectName+'&operation='+this.valueInsertUpdate;
            console.log(this.vfUrl);

            if(this.valueInsertUpdate!='')
            {
                this.showFrame=true;
            }
        }

        assignValue(event)
        {
            this.value=event.detail.value;
        }
        showToast(message,variant) {
            const event = new ShowToastEvent({
                title: 'Help',
                message:
                    message,
                    variant:variant,
            });
            this.dispatchEvent(event);
        }  

        screenChange(event)
        {
            screen=event.target.dataset.id;
            switch(screen)
            {
                case "1":
                    this.firstScreen=false;
                    this.secondScreen=true;
                    this.progress=30;
                    break;
                case "-1":
                    this.firstScreen=true;
                    this.secondScreen=false;
                    this.progress=1;
                    this.value='';
                    this.divColor='default';
                    break;

                case "2":
                    {
                        
                        console.log("value : "+this.value);
                        switch(this.value)
                        {
                            case "option1":
                                this.thirdScreen=true;
                                this.secondScreen=false;
                                this.withMatchingHeaders=true;
                                this.withNoMatchingHeaders=false;
                                this.progress=60;
                                {
                                    console.log("Populating Object Options")
                                    for(let i=0;i<this.queryObjects.length;i++)
                                    {
                                        this.objectOptions.push({label:this.queryObjects[i].SObjectType,value:this.queryObjects[i].SObjectType});
                                        console.log(this.queryObjects[i].SObjectType);
                                    }
                                }
                                
                                break;
                            case "option2":
                                {
                                    this.thirdScreen=true;
                                    this.secondScreen=false;
                                    this.withMatchingHeaders=false;
                                    this.withNoMatchingHeaders=true;
                                    this.progress=60;
                                }

                            break;
                            case "option 3":

                            break;
                            default:{
                                this.showToast("Select Type of PDF to move forward.",'error');                            
                                break;}
                        }
                        break;
                    }
                case "-2":
                    this.thirdScreen=false;
                    this.secondScreen=true;
                    this.withNoMatchingHeaders=false;
                    this.progress=30;
                    this.vfUrl='';
                    this.receivedMessage='';
                    this.valueInsertUpdate='';
                    this.showFrame=false;
                    this.showMessage=false;
                    this.divColor='default';
                    break;
                


            }
        }

        saveDetails()
        {
            console.log("Saving Data.");
            saveDetails({objectName: this.objectName,operation: this.valueInsertUpdate,columns: this.columns,values: this.values})
            .then(result => {
                console.log(result[0]+' , '+result[1]);

                this.showToast(result[0],result[1]);
                this.withMatchingHeaders=false;
                this.vfUrl='';
                this.receivedMessage='';
                this.valueInsertUpdate='';
                this.objectName='';
                this.showFrame=false;
                this.showMessage=false;
                this.progress=100;
                this.showStartButton=true;
                this.showBack=false;
                if(result[1]=='success'){
                    this.finalMessage="Your data has been uploaded successfully!!";
                    this.divColor='successClass';
                }
                else if(result[1]=='error')
                {
                    if(result[0]=='Error : Attempt to de-reference a null object')
                    this.finalMessage="There was an error with the PDF | Error : Column names do not match the ApiName in salesforce.";
                    this.divColor='errorClass';
                    this.progress=80;
                    
                }

            })
            .catch(error => {
                this.showToast("Error : "+error.toString(),'error');
            });
        }

        homePage()
        {
            this.showStartButton=false;
            this.showBack=true;
            this.finalMessage='';
            this.firstScreen=true;
            eval("$A.get('e.force:refreshView').fire();");
            
        }
        updateProgress(event)
        {
            this.progress=event.detail.progress;
            this.showBack=false;
        }

}