public with sharing class getCaseRecords {
    public getCaseRecords() {

    }

    @AuraEnabled(cacheable = true)
    public static List<ObjectWrapper> searchRecords(String searchTerm, string objectName) {
        
        List<ObjectWrapper> wrapperList = new List<ObjectWrapper>();
        
        if(searchTerm != null){
            String myQuery1 = 'FIND \'' + searchTerm + '\'  IN ALL FIELDS RETURNING CASE(SUBJECT WHERE SUBJECT Like  \'%' + searchTerm + '%\' Order by LastViewedDate DESC), ACCOUNT(Name WHERE NAME Like  \'%' + searchTerm + '%\' Order by LastViewedDate DESC)';
            List<List<sObject>> searchList = System.Search.query(myQuery1);
            List <Case> searchCases = searchList.get(0);
            List <Account> searchAccounts = searchList.get(1);
            for(Account acc : searchAccounts) {
                ObjectWrapper objWrapper = new ObjectWrapper();
                objWrapper.Id = acc.Id;
                objWrapper.Name = acc.Name;
                objWrapper.Type = 'Account';
                objWrapper.Icon = 'standard:account';
                wrapperList.add(objWrapper);
            }
            for(Case c : searchCases) { 
                ObjectWrapper objWrapper = new ObjectWrapper();
                objWrapper.Id = c.Id;
                objWrapper.Name = c.Subject;
                objWrapper.Type = 'Case';
                objWrapper.Icon = 'standard:case';
                wrapperList.add(objWrapper);
            }
        }
        else{
            // if(objectName != null && objectName != 'All' && searchTerm != null){
            //     String myQuery;
            //     myQuery = 'Select Id, Name from '+objectName+' Where Name Like  \'%' + searchTerm + '%\' LIMIT  5';
            //     List<sObject> lookUpList = database.query(myQuery);
            //     for(sObject myobj: lookUpList){
            //         ObjectWrapper objWrapper = new ObjectWrapper();
            //         objWrapper.Id = myobj.Id;
            //         objWrapper.Name = String.valueOf(myobj.get('Name'));
            //         objWrapper.Type = objectName;
            //         if(objectName =='Account')
            //             objWrapper.Icon = 'standard:account';
            //         else if(objectName =='Contact')
            //             objWrapper.Icon = 'standard:contact';
            //         else if(objectName =='Opportunity')
            //             objWrapper.Icon = 'standard:opportunity';
            //         wrapperList.add(objWrapper);
            //     }
            // }
        }
        return wrapperList;
    }
    public class ObjectWrapper {
        @AuraEnabled
        public String Id{get;set;}
        @AuraEnabled
        public String Name{get;set;}
        @AuraEnabled
        public String Type{get;set;}
        @AuraEnabled
        public String Icon{get;set;}
    }
}