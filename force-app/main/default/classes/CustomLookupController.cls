public with sharing class CustomLookupController {
    
    @AuraEnabled(cacheable=true)
    public static List<EntityDefinition> fetchLookupData(Searchable searcher) {    
        
        List<EntityDefinition> resultList = new List<EntityDefinition> ();
        
        List<Id> recId = searcher.selectedRecId;
        
        //create query
        String sWildCardText = searcher.searchTerm + '%';
        
        // String query;
        //     query = 'SELECT Id, Label, MasterLabel,DeveloperName, QualifiedApiName FROM EntityDefinition where ' + 'DeveloperName Like:sWildCardText order by DeveloperName ASC LIMIT ' + searcher.lim;

              
        try {
            resultList = [SELECT Id, Label, MasterLabel,DeveloperName, QualifiedApiName FROM EntityDefinition where DeveloperName Like :sWildCardText Limit :searcher.lim];
        } catch (QueryException e) {
            System.debug(e.getMessage());
        }
        
        return resultList;
    }
    
    
    /**************************************************************************************
    * @Description  : custome wrapper class 
    * @Param	: -----	
    * @Return   : -------    
    **************************************************************************************/
    public class Searchable {
        
        @AuraEnabled
        public String searchTerm {get;set;}
        @AuraEnabled
        public String objectName {get;set;}
        @AuraEnabled
        public Integer lim {get;set;}
        @AuraEnabled
        public List<Id> selectedRecId {get;set;}
    }
}