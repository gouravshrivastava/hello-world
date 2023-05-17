import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class ParentLwcComponent extends NavigationMixin(LightningElement) {

    showArrow=false;
    navigateToPage(event)
    {
        var id=event.target.dataset.id;
        console.log(id);
        switch(id)
        {
            case "what":
                this[NavigationMixin.Navigate]({
                    type: 'standard__webPage',
                    attributes: {
                        url:'https://apithon-dev-ed.my.site.com/ApithonSalesforceIntegrationPatterns/s/what-is-integration'
                    },
                })
                break;

                case "capabilities":
                    this[NavigationMixin.Navigate]({
                        type: 'standard__webPage',
                        attributes: {
                            url:'https://apithon-dev-ed.my.site.com/ApithonSalesforceIntegrationPatterns/s/integration-capabilities'
                        },
                    })
                    break;

                case "patterns":
                        this[NavigationMixin.Navigate]({
                            type: 'standard__webPage',
                            attributes: {
                                url:'https://apithon-dev-ed.my.site.com/ApithonSalesforceIntegrationPatterns/s/integration-design-patterns'
                            },
                    })
                    break;

                case "case":
                        this[NavigationMixin.Navigate]({
                                type: 'standard__webPage',
                                attributes: {
                                    url:'https://apithon-dev-ed.my.site.com/ApithonSalesforceIntegrationPatterns/s/use-cases'
                                },
                    })
                    break;

                default: console.log("No choice");
                        break;
        }
        
    }
    minimizeSidebar()
    {
        this.template.querySelector('[data-id="side"]').classList.remove('sidenav');
        this.template.querySelector('[data-id="side"]').classList.add('sidenavMinimized');
        this.template.querySelector('[data-id="main"]').classList.remove('main');
        this.template.querySelector('[data-id="main"]').classList.add('mainExpanded');
        this.showArrow=true;
    }
    maximizeSidebar()
    {
        this.template.querySelector('[data-id="side"]').classList.remove('sidenavMinimized');
        this.template.querySelector('[data-id="side"]').classList.add('sidenav');
        this.template.querySelector('[data-id="main"]').classList.remove('mainExpanded');
        this.template.querySelector('[data-id="main"]').classList.add('main');
        this.showArrow=false;
    }


}