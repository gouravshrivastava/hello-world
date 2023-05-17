public with sharing class CheckCriteriaCreateClass {
    
    public String checkCriteria(Map<String ,String> mapData)
    {
        system.debug('data of criteria' + mapData);
        String objectApiName = mapData.get('ObjectApiName');
        System.debug('objectApiNAme' + mapData.get('ObjectApiName'));
        try{
        Trigger_Configuration__mdt metadata = [SELECT Object_API_Name__c FROM Trigger_Configuration__mdt 
                                               WHERE Object_API_Name__c =:objectApiName];
            if(metadata!=null){
                return 'Trigger allready exist for object '+'\''+objectApiName+'\'';
            }
    	}
        catch(Exception e)
        {
            system.debug(e.getMessage());
            CreateClassUtil ccu = new CreateClassUtil();
			ccu.CreateClass(mapData);
            return 'Trigger Created Successfully';
             
        }
        return 'Triggers not created please try agin later';

	}
}