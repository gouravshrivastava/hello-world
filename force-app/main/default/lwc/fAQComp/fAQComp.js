import { LightningElement } from 'lwc';


export default class FAQComp extends LightningElement {


    renderedCallback()
    {
        var faq = this.template.querySelectorAll('.faq-page');
        var i ;
        for (i = 0; i < faq.length; i++) {
            faq[i].addEventListener("click", function () {
                /* Toggle between adding and removing the "active" class,
                to highlight the button that controls the panel */
                this.classList.toggle("active");
                /* Toggle between hiding and showing the active panel */
                var body = this.nextElementSibling;
                console.log('clicked' , body);
                if (body.style.display === "block") {
                    body.style.display = "none";
                } else {
                    body.style.display = "block";
                }
            });
        }

    }
   
}