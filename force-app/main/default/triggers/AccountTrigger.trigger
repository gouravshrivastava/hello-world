trigger AccountTrigger on Account (before insert, after insert, before update, after update, before delete, after delete, after undelete) {
  Trigger_Configuration__mdt metaData = new TriggerMetadata().getMetadata('AccountTrigger');
    TriggerHandler handler = new AccountTriggerHandler(Trigger.isExecuting, Trigger.size, 'AccountTrigger');
    switch on Trigger.operationType {
            when BEFORE_INSERT {
                if(metaData.Before_Insert__c)
                  handler.beforeInsert(Trigger.new);
            }
            when BEFORE_UPDATE {
                if(metaData.Before_Update__c)
                  handler.beforeUpdate(Trigger.old, Trigger.new, Trigger.oldMap, Trigger.newMap);
            }
            when BEFORE_DELETE {
                if(metaData.Before_Delete__c)
                   handler.beforeDelete(Trigger.old, Trigger.oldMap);
            }
            when AFTER_INSERT {
                if(metaData.After_Insert__c)
                  handler.afterInsert(Trigger.new, Trigger.newMap);
            }
            when AFTER_UPDATE {
                if(metaData.After_Update__c)
                   handler.afterUpdate(Trigger.old, Trigger.new, Trigger.oldMap, Trigger.newMap);
            }
            when AFTER_DELETE {
                if(metaData.After_Delete__c)
                  handler.afterDelete(Trigger.old, Trigger.oldMap);
            }
            when AFTER_UNDELETE {
                if(metaData.After_Undelete__c)
                   handler.afterUndelete(Trigger.new, Trigger.newMap);
            }
    }
}