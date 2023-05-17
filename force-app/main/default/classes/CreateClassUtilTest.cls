@isTest
public class CreateClassUtilTest {
    @IsTest
    
    public static void configSetupTest () {
        
        Map<String, Object> mapData = new Map<String, Object>();
        mapData.put('Before_Insert__c',true);
        mapData.put('Before_Delete__c',true);
        mapData.put('After_Update__c',true);
        mapData.put('After_Undelete__c',true);
        mapData.put('After_Insert__c',true);
        mapData.put('After_Delete__c',true);
        mapData.put('Before_Update__c',true);
        mapData.put('ObjectApiName','Account');
        mapData.put('Trigger_API_Name__c','AccountTrigger');
        String metdataName = 'Trigger_Configuration__mdt';
        String label = 'Account';
        TriggerMetadata md = new TriggerMetadata();
        
        
        Test.startTest();
        try{
        CustomMetadataUtils.createCustomMetadata('Trigger_Configuration__mdt', label, mapData);
        
        md.getMetadata('AccountTrigger');
        }
        catch(Exception e)
        {
            system.debug('true');
        }
        
        
        Test.stopTest();
        
    }
    
    @IsTest
    
    public static void CreateUpdateMetadataUtilsTest(){
        
        CustomMetadataUtils metadata = new CustomMetadataUtils ();
        
        Test.startTest();
        
        metadata.handleResult(new Metadata.DeployResult(), new Metadata.DeployCallbackContext());
        
        Test.stopTest();
        
    }
    static testMethod void validateCreateClass()
    {
        Map<String, String> mapData = new Map<String, String>();
        mapData.put('Before_Insert__c','true');
        mapData.put('Before_Delete__c','true');
        mapData.put('After_Update__c','true');
        mapData.put('After_Undelete__c','true');
        mapData.put('After_Insert__c','true');
        mapData.put('After_Delete__c','true');
        mapData.put('Before_Update__c','true');
        mapData.put('ObjectApiName','EntityDefinition');
       // CreateClassUtil ccu = new CreateClassUtil();
        //CreateTrigger ct = new CreateTrigger();
        CreateTrigger.invokeCreateTrigger(mapData);
        
        //ccu.CreateClass(mapData);
        
        
    }
}