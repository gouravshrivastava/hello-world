public without sharing class OpportunityTriggerHelper {
	public OpportunityTriggerHelper() {
        System.debug('Inside OpportunityTriggerHelper');
    }
    
    public void beforeInsertOpportunity(List<Opportunity> newOpportunitys) {
        System.debug('beforeInsertOpportunity Trigger is Active');
    }
    public void afterInsertOpportunity() {
        System.debug('afterInsertOpportunity Trigger is Active');
    }
    public void beforeUpdateOpportunity() {
        System.debug('beforeUpdateOpportunity Trigger is Active');
    }
    public void afterDeleteOpportunity() {
        System.debug('afterDeleteOpportunity Trigger is Active');
    }
    public void beforeDeleteOpportunity() {
        System.debug('beforeDeleteOpportunity Trigger is Active');
    }
    public void afterUnDeleteOpportunity() {
        System.debug('afterUnDeleteOpportunity Trigger is Active');
    }
    public void afterUpdateOpportunity() {
        System.debug('afterUpdateOpportunity Trigger is Active');
    }
}