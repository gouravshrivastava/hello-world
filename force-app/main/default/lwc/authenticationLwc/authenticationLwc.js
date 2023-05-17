import { LightningElement } from 'lwc';

export default class AuthenticationLwc extends LightningElement {
    showLogin=true;
    showSignup=false;

    toggle(){

        this.showLogin=!this.showLogin;
        this.showSignup=!this.showSignup;

    }
}