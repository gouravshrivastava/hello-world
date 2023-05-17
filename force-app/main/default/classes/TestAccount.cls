public class TestAccount {
     //Methods to write bussiness logics
    public void modifyAccountName() {
        for(Account thisAccount : [SELECT Id,Industry FROM Account LIMIT 150]){
            System.debug('GS thisAccount test debug');
            System.debug(thisAccount);
            if(thisAccount.Industry=='Technology'){
                System.debug('GS one debug');
                thisAccount.Is_Tech__c=true;
                System.debug('GS two debug');
            }
            update thisAccount;
        }
    }
    
    public void testName(){
        Account a=new Account();
        System.debug('GS three debug '+a);
        Database.insert(a,false);
        System.debug('GS 4 debug '+Database.insert(a,false));
    }
    
    public void testName1(){
        for(Integer i=0; i<500;i++){
            Account a=new Account(Name='New Account '+i);
            insert a;
            System.debug('GS 5 debug '+a);
        }
    }
    
}