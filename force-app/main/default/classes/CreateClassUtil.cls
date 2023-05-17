public with sharing class  CreateClassUtil {
	public void CreateClass(Map<string ,String> mapData) {
		String ObjectApiName = mapData.get('ObjectApiName');
		Map < String, Object > metadataFieldValueMap = new Map < String, Object > ();
		

		List < CreateClass__mdt > metaData = [select DeveloperName, ClassBody__c from CreateClass__mdt ORDER BY DeveloperName desc];
		system.debug(ObjectApiName);
		system.debug(mapData);
		for (CreateClass__mdt md: metaData) {
			ApexClassWrapper ClassWrapper = new ApexClassWrapper();
			TriggerClassWrapper TriggerWrapper = new TriggerClassWrapper();
			CreateClassTool ClassTool = new CreateClassTool();
			if (md.DeveloperName == 'SobjectTrigger') {
				TriggerWrapper.Name = md.DeveloperName.replace('Sobject', ObjectApiName);
				TriggerWrapper.Body = md.ClassBody__c.replace('SObject', ObjectApiName);
				TriggerWrapper.TableEnumOrId = ObjectApiName;
				String jsonPayload = JSON.serialize(TriggerWrapper);
				ClassTool.createApexTrigger(jsonPayload);
			} else {
				ClassWrapper.Name = md.DeveloperName.replace('Sobject', ObjectApiName);
				ClassWrapper.Body = md.ClassBody__c.replace('SObject', ObjectApiName);
				String jsonPayload = JSON.serialize(ClassWrapper);
				ClassTool.createApexClass(jsonPayload);
			}
		}
		metadataFieldValueMap.put('After_Delete__c', Boolean.valueOf(mapData.get('After_Delete__c')));
		metadataFieldValueMap.put('After_Insert__c', Boolean.valueOf(mapData.get('After_Insert__c')));
		metadataFieldValueMap.put('After_Undelete__c', Boolean.valueOf(mapData.get('After_Undelete__c')));
		metadataFieldValueMap.put('After_Update__c', Boolean.valueOf(mapData.get('After_Update__c')));
		metadataFieldValueMap.put('Before_Delete__c', Boolean.valueOf(mapData.get('Before_Delete__c')));
		metadataFieldValueMap.put('Before_Insert__c', Boolean.valueOf(mapData.get('Before_Insert__c')));
		metadataFieldValueMap.put('Before_Update__c', Boolean.valueOf(mapData.get('Before_Update__c')));
		metadataFieldValueMap.put('Object_API_Name__c', ObjectApiName);
		metadataFieldValueMap.put('Trigger_API_Name__c', ObjectApiName + 'Trigger');
		
        if(!Test.isRunningTest())
		CustomMetadataUtils.createCustomMetadata('Trigger_Configuration__mdt', ObjectApiName, metadataFieldValueMap);


	}
}