public class getMetadata {
    @AuraEnabled(cacheable=true)
    public static List<IntegrationVideoDetail__mdt> getRecords()
    {
        List<IntegrationVideoDetail__mdt> metadata = [SELECT Id,MasterLabel,ThumbnailURL__c,Title__c,VideoLink__c,Keyword__c from IntegrationVideoDetail__mdt];
    	return metadata;
    }

}