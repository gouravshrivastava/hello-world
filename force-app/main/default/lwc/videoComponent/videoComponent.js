import { LightningElement } from 'lwc';

export default class VideoComponent extends LightningElement {

    vdata;

    handleClickEvent(event)
    {
        this.vdata=event.detail;
        console.log(vdata);
    }
}