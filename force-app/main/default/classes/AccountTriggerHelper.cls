public without sharing class AccountTriggerHelper {
	public AccountTriggerHelper() {
        System.debug('Inside AccountTriggerHelper');
    }
    
    public void beforeInsertAccount(List<Account> newAccounts) {
        System.debug('beforeInsertAccount Trigger is Active');
    }
    public void afterInsertAccount() {
        System.debug('afterInsertAccount Trigger is Active');
    }
    public void beforeUpdateAccount() {
        System.debug('beforeUpdateAccount Trigger is Active');
    }
    public void afterDeleteAccount() {
        System.debug('afterDeleteAccount Trigger is Active');
    }
    public void beforeDeleteAccount() {
        System.debug('beforeDeleteAccount Trigger is Active');
    }
    public void afterUnDeleteAccount() {
        System.debug('afterUnDeleteAccount Trigger is Active');
    }
    public void afterUpdateAccount() {
        System.debug('afterUpdateAccount Trigger is Active');
    }
}