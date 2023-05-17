import { api,LightningElement } from 'lwc';

export default class SearchBarEvent extends LightningElement {

    @api userInput;
    handleSearch(event){
        this.userInput=event.target.value;
        console.log(this.userInput);
        const newEvent=new CustomEvent('inputcarryevent',{
            detail:this.userInput

        });
        this.dispatchEvent(newEvent);

    }

}