public class AccountTriggerHandler implements TriggerHandler {
    private boolean triggerIsExecuting;
    private integer triggerSize;
    private Map < String, Boolean > methodNames;
    public AccountTriggerHelper helper;
    public AccountTriggerHandler(boolean triggerIsExecuting, integer triggerSize, String triggerName) {
        this.triggerIsExecuting = triggerIsExecuting;
        this.triggerSize = triggerSize;
        this.helper = new AccountTriggerHelper();

    }

    public void beforeInsert(List < Account > newAccounts) {
        helper.beforeInsertAccount(newAccounts);

    }
    public void beforeUpdate(List < Account > oldAccounts, List < Account > newAccounts, Map < ID, Sobject > oldAccountMap, Map < ID, Sobject > newAccountMap) {
        helper.beforeUpdateAccount();

    }
    public void beforeDelete(List < Account > oldAccounts, Map < ID, Sobject > oldAccountMap) {
        helper.beforeDeleteAccount();

    }
    public void afterInsert(List < Account > newAccounts, Map < ID, Sobject > newAccountMap) {
        helper.afterInsertAccount();

    }
    public void afterUpdate(List < Account > oldAccounts, List < Account > newAccounts, Map < ID, Sobject > oldAccountMap, Map < ID, Sobject > newAccountMap) {
        helper.afterUpdateAccount();

    }
    public void afterDelete(List < Account > oldAccounts, Map < ID, Sobject > oldAccountMap) {
        helper.afterDeleteAccount();

    }
    public void afterUndelete(List < Account > newAccounts, Map < ID, Sobject > newAccountMap) {
        helper.afterUndeleteAccount();

    }

}