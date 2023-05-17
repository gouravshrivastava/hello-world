public with sharing class PDFGenerateCtrl {
    public Solution__c sol{get;set;}
    public String currentRecordId{get;set;}
    public String answers{get;set;}
  
     public PDFGenerateCtrl(){
         currentRecordId  = ApexPages.CurrentPage().getparameters().get('id');
         answers=ApexPages.CurrentPage().getparameters().get('answers');
       
         if(currentRecordId != null && String.isNotBlank(currentRecordId)){
            sol = [SELECT Id, Name, What__c, Where__c,How__c,Limitation__c,(select Name,What__c from Sub_Solutions__r) FROM Solution__c WHERE Id =:currentRecordId];
         }

     }
  
     @AuraEnabled
     public static String generateandsendPdf(String dataId, String email,String answers) {
         PageReference pdf = new pagereference('/apex/SolutionDetailsPdf?id='+dataId +'&answers='+answers);
         pdf.getParameters().put('id', dataId);
         pdf.getParameters().put('answers', answers);
        

      
         Blob body;
         try {
             // returns page as a PDF
             body = pdf.getContent();
         } catch (Exception e) {
             body = Blob.valueOf('data');
         }
  
         //insert content version
        //  ContentVersion CV = new ContentVersion();
        //  CV.Title = 'SolutionDetails.pdf';
        //  CV.PathOnClient = 'SolutionDetails.pdf';
        //  CV.VersionData = body;
        //  insert CV;
          
        //  Messaging.EmailFileAttachment attach = new Messaging.EmailFileAttachment();
        //  attach.setContentType('application/pdf');
        //  attach.setFileName('SolutionDetails.pdf');
        //  attach.Body = body;
  
        //  Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        //  mail.setToAddresses(new String[] {'manav.d.sabarwal@apisero.com'});
        //  mail.setSubject('Solution Details PDF');
        //  mail.setHtmlBody('PFA the exported PDF containg the Solution Details.');
        //  mail.setFileAttachments(new Messaging.EmailFileAttachment[] {attach}); 
        //  // Send the email
        //  Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
        return 'PDF Generated.';
    }
 }