import { LightningElement,track,wire,api } from 'lwc';
import OBJECTS from '@salesforce/apex/PDFController.getObjects';
import getfields from '@salesforce/apex/PDFController.getfields';
import getVFOrigin from '@salesforce/apex/PDFController.getVFOrigin';
import saveDetails from '@salesforce/apex/PDFController.saveDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class PdfToTextDiffHeaders extends LightningElement {

    valueInsertUpdate='';
    showMessage=false;;
    object='';
    @track data;
    @track TypeOptions;
    showFrame=false;
    showButton=false;
    vfUrl='';
    objectName='';
    isModalOpen=false;
    receivedMessage='';
    @track fields;
    fieldDict={};
    selectedField='';
    columns;
    values=[];
    showTable=false;
    showStartButton=false;
    divColor="default";

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


    get optionInsertUpdate()
        {
            return[
                {label: 'Insert',value:'Insert'},
                {label: 'Update',value:'Update'},
            ];

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
            console.log("----------------------------------------------------------------------------------");
            console.log(this.vfOrigin);
            if (message.origin === this.vfOrigin) {
                this.showFrame=false;
                this.receivedMessage = message.data.payload;
                console.log("===================="+this.receivedMessage);
                
                this.splitMessage=this.receivedMessage.split('#');
                console.log("++"+this.splitMessage);
                this.columns=this.splitMessage[0].split('<>');
                for(var i=1;i<this.splitMessage.length;i++)
                {
                    var val=this.splitMessage[i].split('<>');
                    this.values.push(val);
                }
                console.log("==========VALUES++++++++="+this.values);
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
                    this.showButton=true;
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
                this.showButton=true;
            }
            console.log("GETFIELDS");
            let options = [];
            getfields({objectname : this.objectName})
            .then(result => {

                for(var i in result)
                {
                    options.push({ label:result[i] , value: result[i]});
                }
                this.fields=options;
                // console.log("FIELDS++++++++++++++ "+this.fields);
            })
            .catch(error => {
                console.log(error);
            });
        }

        closeModal()
        {
            this.isModalOpen=false;
            this.showButton=true;
            this.showFrame=false;
            this.showTable=false;
            this.fieldDict={};
            this.receivedMessage='';
            this.columns=[];
            this.values=[];
            this.fieldS=[];

        }

        openModal()
        {
            this.isModalOpen=true;
            this.showButton=false;
            this.showFrame=true;
            this.fieldDict={};
        }

        handleFieldChange(event)
        {
            this.fieldDict[event.target.dataset.id]=event.detail.value;
            console.log(this.fieldDict);
            
        }

        submitDetails()
        {
            for(var key in this.fieldDict)
            {
                // console.log(this.fieldDict[key]);
                // console.log(this.columns.indexOf(this.fieldDict[key]));
                this.columns[this.columns.indexOf(key)]=this.fieldDict[key];
                console.log(this.columns);
            }
            this.showTable=true;
        }

        showToast(message,variant)
        {
            const event = new ShowToastEvent({
                title: 'Help',
                message:
                    message,
                variant:variant,
            });
            this.dispatchEvent(event);
        }

        saveDetails(){
            console.log("Saving Data.");
            saveDetails({objectName: this.objectName,operation: this.valueInsertUpdate,columns: this.columns,values: this.values})
            .then(result => {
                this.showToast(result[0],result[1]);
                this.vfUrl='';
                this.receivedMessage='';
                this.valueInsertUpdate='';
                this.objectName='';
                this.showFrame=false;
                this.showMessage=false;
                this.progress=100;
                this.showStartButton=true;

                if(result[1]=='success'){
                    this.finalMessage="Your data has been uploaded successfully!!";
                    this.divColor='successClass';
                    
                    const progressEvent=new CustomEvent('progressupdate',{detail:{progress:this.progress,showBack:false}});
                    this.dispatchEvent(progressEvent);
                }
                else if(result[1]=='error')
                {
                    this.finalMessage="There was an error with the PDF";
                    if(result[0]=='Error : Attempt to de-reference a null object')
                    this.finalMessage="There was an error with the PDF | Error : Column names do not match the ApiName in salesforce.";
                    this.divColor='errorClass';
                    this.progress=80;
                    const progressEvent=new CustomEvent('progressupdate',{detail:{progress:this.progress,showBack:false}});
                    this.dispatchEvent(progressEvent);
                    
                }

            })
            .catch(error => {
                this.showToast("Error : "+error.toString(),'error');
                this.showStartButton=true;
                this.finalMessage="";
                const progressEvent=new CustomEvent('progressupdate',{detail:{progress:80,showStartButton:true}});
                this.dispatchEvent(progressEvent);
            });
        }

        homePage()
        {
            this.showStartButton=false;
            this.finalMessage='';
            this.firstScreen=true;
            eval("$A.get('e.force:refreshView').fire();");
            
        }
    
}