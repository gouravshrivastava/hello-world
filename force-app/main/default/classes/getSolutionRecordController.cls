public without sharing class getSolutionRecordController {

    @AuraEnabled(cacheable=true)

    public static List<Solution__c> getSolutions(String Name) {
        system.debug(Name);
        list<Solution__c> ls = [SELECT Id, Name,What__c,Where__c,How__c,Limitation__c 
        FROM Solution__c where Name= :Name]; 
        system.debug(ls);

        return ls;
}

    @AuraEnabled(cacheable=true)

    public static List<Sub_Solution__c> getSubSolutions(String Name) {
        system.debug(Name);

        list<Sub_Solution__c> ls = [SELECT Id, Name FROM Sub_Solution__c WHERE Solution__r.Name=:Name]; 
        system.debug(ls);

        return ls;
    }

    @AuraEnabled
      public static List<Sub_Solution__c> getFinalSolution(String subSolutionId) {
        system.debug(subSolutionId);

        list<Sub_Solution__c> ls = [SELECT Id, Name , Limitation__c,(SELECT Id,Name, Steps__c FROM Prerequisites__r), (SELECT Name,Description__c FROM Tools__r) 
        FROM Sub_Solution__c WHERE id=:subSolutionId]; 
        system.debug(ls);
        return ls;
    }

    @AuraEnabled
    public static list<Comparison__c> getComparison(List<String> subSols){

      list<Comparison__c> c=[Select id, name, scalability__c,Execution_Time__c,Number_Of_Records__c ,Cost__c  from Comparison__c where Name in :subSols];
      return c;
    }



}