public class TriggerMetadata {
    public Trigger_Configuration__mdt getMetadata(String triggerApiName)
    {
        Trigger_Configuration__mdt metadata = [SELECT Trigger_API_Name__c, Before_Insert__c,Before_Delete__c,Before_Update__c,After_Update__c,
                                               After_Undelete__c,After_Insert__c,After_Delete__c FROM Trigger_Configuration__mdt 
                                               WHERE Trigger_API_Name__c =:triggerApiName];
        return metadata;
        
    }
  
}