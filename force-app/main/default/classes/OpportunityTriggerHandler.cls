public class OpportunityTriggerHandler implements TriggerHandler {
    private boolean triggerIsExecuting;
    private integer triggerSize;
    private Map < String, Boolean > methodNames;
    public OpportunityTriggerHelper helper;
    public OpportunityTriggerHandler(boolean triggerIsExecuting, integer triggerSize, String triggerName) {
        this.triggerIsExecuting = triggerIsExecuting;
        this.triggerSize = triggerSize;
        this.helper = new OpportunityTriggerHelper();

    }

    public void beforeInsert(List < Opportunity > newOpportunitys) {
        helper.beforeInsertOpportunity(newOpportunitys);

    }
    public void beforeUpdate(List < Opportunity > oldOpportunitys, List < Opportunity > newOpportunitys, Map < ID, Sobject > oldOpportunityMap, Map < ID, Sobject > newOpportunityMap) {
        helper.beforeUpdateOpportunity();

    }
    public void beforeDelete(List < Opportunity > oldOpportunitys, Map < ID, Sobject > oldOpportunityMap) {
        helper.beforeDeleteOpportunity();

    }
    public void afterInsert(List < Opportunity > newOpportunitys, Map < ID, Sobject > newOpportunityMap) {
        helper.afterInsertOpportunity();

    }
    public void afterUpdate(List < Opportunity > oldOpportunitys, List < Opportunity > newOpportunitys, Map < ID, Sobject > oldOpportunityMap, Map < ID, Sobject > newOpportunityMap) {
        helper.afterUpdateOpportunity();

    }
    public void afterDelete(List < Opportunity > oldOpportunitys, Map < ID, Sobject > oldOpportunityMap) {
        helper.afterDeleteOpportunity();

    }
    public void afterUndelete(List < Opportunity > newOpportunitys, Map < ID, Sobject > newOpportunityMap) {
        helper.afterUndeleteOpportunity();

    }

}