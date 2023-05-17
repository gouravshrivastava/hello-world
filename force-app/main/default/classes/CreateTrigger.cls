public with sharing class CreateTrigger {

    @AuraEnabled
    public static string invokeCreateTrigger(Map<String ,String> mpdata){
        CheckCriteriaCreateClass cu = new CheckCriteriaCreateClass();
        //return 'Triggeres';
       return cu.checkCriteria(mpData);  
    }
}