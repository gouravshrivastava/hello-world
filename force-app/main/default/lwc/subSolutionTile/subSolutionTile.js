import { api, LightningElement, wire,track} from 'lwc';
import { publish,subscribe, MessageContext } from 'lightning/messageService';
import RESULT from '@salesforce/messageChannel/result__c';
import SUBSOL from '@salesforce/messageChannel/subSol__c';

import getSubSolutions from '@salesforce/apex/getSolutionRecordController.getSubSolutions';
import getComparison from '@salesforce/apex/getSolutionRecordController.getComparison';

export default class SubSolutionTile extends LightningElement {

    @wire(MessageContext)
    messageContext;

    subSolution;
    @api showModal=false;
    @track selectedApproaches=[];
    hasData=false;
    showCompare=false;
    showButtons=true;
    results=[];
    showSubsolutions=false;
    subscription = null;
    heading="Comparison";
    data=[];
    scalability;
    exec;
    recs;
    blank=' ';

    getData(sub)
    {
      
      getComparison({subSols:sub}).then(result =>{
        console.log(sub);
        console.log("Comparison");
        this.data=result;
        console.log(this.data);
      })
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
        this.messageContext,
        RESULT,
        (message) => this.handleMessage(message)
      );
    }

    connectedCallback() {
        this.subscribeToMessageChannel();
      }


    handleMessage(message)
    {
      
        
        // if(message.message==null || message.message==''){
        //   // this.subSolution=null;
        //   this.selectedApproaches=[];
        //   var dataObj = {message: null};
        //   console.log(dataObj);
        //   console.log("----");
        //   this.subSolution=[];
        //   this.showSubsolutions=false;
        //   publish(this.messageContext, SUBSOL, dataObj);
        // }
        // else{
        // if(message.message==null || message.message=='')
        // {
          var dataObj = {message: null};
          console.log(dataObj);
          publish(this.messageContext, SUBSOL, dataObj);
        // }
        this.selectedApproaches=[];
        console.log('Message from channel -> ',message.message.toString());
        var name =message.message.toString();
        getSubSolutions({ Name: name}).then(result => {
        // getSubSolutions({ Name: message.result.toString()}).then(result => {
        console.log(result);
        
        this.subSolution = result;
        console.log('Subsolutions are :'+this.subSolution);
          console.log(this.subSolution.length);
        if(this.subSolution.length>0)
        {
          this.showSubsolutions=true;
          console.log("true");
          if(this.subSolution.length>=2)
          {
            this.heading="Select Atleast 2 Approaches to Compare"
            this.showCompare=true;
            this.updateSelectedApproaches();
          }

          else{
            this.showCompare=false;
          }
          

        }
        else
        {
          this.showSubsolutions=false;
          console.log("Subsolution Empty");
        }
        }).catch(error =>
          {
            console.log(error);
            this.showSubsolutions=false;
          });
        // }
          
    }

      get options() {

        let option=[];
        if(this.subSolution.length>=1)
        {
        for (let k = 0; k < this.subSolution.length; k++) {

          const name=this.subSolution[k].Name;
          const id=this.subSolution[k].Id;

          option.push({
              label: name,
              value: id
          })
      }
      this.results=option;

      console.log("Options are : "+JSON.stringify(option));
      return option;
    }
      return null;
      
    }

    updateSelectedApproaches()
    {
      
          if(this.subSolution.length==2)
          {
            this.showButtons=false;
            this.heading="Comparison";
            this.selectedApproaches=[];
            for (let k = 0; k < this.subSolution.length; k++) {

              this.selectedApproaches.push(this.subSolution[k].Name.toString());
              console.log("In for : "+this.selectedApproaches);
            }
            this.getData(this.selectedApproaches);
            this.updateHasData();
          }
          else{
            this.selectedApproaches=[];
          }
    }

    handleChange(event){

      const selectedOption = event.detail.value;
      // alert('selectedOption ' + selectedOption);
      // const finalSolId = {
      //       result : selectedOption.toString()
      //   };
      //   console.log('handle change :'+finalSolId);
        // var data=finalSolId.trim();
        // var data = {message: data};
        // console.log(data);
        // publish(this.messageContext, SUBSOL, finalSolId);


      
        var dataObj = {message: selectedOption};
        
        console.log(dataObj);
        publish(this.messageContext, SUBSOL, dataObj);
        console.log('after publish subsol id');


    }

    showModalBox()
    {
      this.updateSelectedApproaches();
      this.showModal=true;

    }

    hideModalBox()
    {
      this.showModal=false;
      this.hasData=false;
      this.showButtons=true;
    }
    updateHasData()
    {
      if(this.selectedApproaches.length==0)
      {
        this.hasData=false;
      }
      else if(this.selectedApproaches.length>=2){
        this.hasData=true;
      }
    }
    approachSelected(event)
    {
        var sel=event.target.dataset.id;
        if(this.selectedApproaches.includes(sel))
        {
          alert("removing "+sel);
          this.selectedApproaches=this.selectedApproaches.filter(value => value !== sel);
          this.getData(this.selectedApproaches);
          this.updateHasData();
        }
        else
        {
          this.selectedApproaches.push(sel);
          this.getData(this.selectedApproaches);
          this.updateHasData();
        }
    }

}