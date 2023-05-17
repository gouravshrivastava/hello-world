public with sharing class PDFController {
    public static String objectName{get;set;}
    public static String operation{get;set;}
    // public static List<String> columnsfromPdf;
    public string lexOrigin {get{ 
        return URL.getOrgDomainUrl().toExternalForm().split('.my.')[0]+'.lightning.force.com';
        } set;}
    public PDFController() {
        // columnsfromPdf=new List<String>();

        

    }
    // @AuraEnabled(cacheable=true)
    // public List<String> getColumns(){
    //     return columnsfromPdf;
    // }
    @AuraEnabled
    public static List<string> saveDetails(String objectName,String operation,List<String> columns, List<List<String>> values){
        string message='';
        string variant='';
        List<string> result=new List<String>();
        System.debug('ObjectName in saveDetails : '+objectName);
        try {
            List<SObject> saveRecords=new List<SObject>();
            for(Integer i=0;i<columns.size();i++)
            {
                columns[i]=columns[i].trim();
            }
            
            for(Integer i=0;i<values.size();i++)
            {
                sObject record = ((sObject)Type.forName('Schema',objectName).newInstance());
                
                for(Integer j=0;j<values[i].size();j++)
                {
                    
                    Schema.DisplayType f = Schema.getGlobalDescribe()
                                             .get(objectName)
                                             .getDescribe()
                                             .fields
                                             .getMap()
                                             .get(columns[j])
                                             .getDescribe()
                                             .getType(); // or getSOAPType()
                                             System.debug('Type: '+f);

                    switch on (f) {
                    when id, address, combobox, email, encryptedstring, multipicklist, phone, picklist, reference, string, textarea, url {
                        record.put(columns[j], (string)values[i][j].trim());
                        }
                    when Boolean {
                        record.put(columns[j], Boolean.valueOf((String)values[i][j].trim()));
                        }
                    when Date {
                        record.put(columns[j], Date.valueOf((String)values[i][j].trim()));
                        }
                    when DateTime {
                        record.put(columns[j], DateTime.valueOf((String)values[i][j].trim()));
                        }
                    when currency, double, percent {
                        record.put(columns[j], Double.valueOf((String)values[i][j].trim()));
                        }
                    when integer {
                        record.put(columns[j], Integer.valueOf((String)values[i][j].trim()));
                        }
                    when long {
                        record.put(columns[j], Long.valueOf((String)values[i][j].trim()));
                        }
                    }
                    system.debug(record);
                }
                saveRecords.add(record);
                system.debug(operation);
                
                
            }
            Database.upsert(saveRecords);
            variant='success';
            if(operation=='Insert')
                {
                    message='Records created successfully.';
                }
                else if(operation=='Update')
                {
                    message='Records updated successfully.';
                }

            
        } catch (Exception e) {
            system.debug(e.getMessage());
            message='Error : '+e.getMessage();
            variant='error';

        }
        result.add(message);
        result.add(variant);
         return result;
    }

    
    @AuraEnabled(cacheable=true)
    public static List<String> getObjects()
    {
        Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe(); 
        Set<String> Objects = new Set<String>();
        for(Schema.SObjectType d : gd.values())
        {
            Objects.add(d.getDescribe().getName());
        }

        List<String> lStrings = new List<String>(Objects);
        system.debug(lStrings);
        lStrings.sort();
        return lStrings;

    }
    @AuraEnabled(cacheable=true)
    public static List<String> getfields(string objectname){
        string query = 'select QualifiedApiName from FieldDefinition where EntityDefinition.QualifiedApiName = :objectname ORDER BY QualifiedApiName ASC';
        list<FieldDefinition> lstObject = Database.query(query);
        list<String> field=new List<String>();
        system.debug('lstObject==> '+lstObject);
        for(Integer i=0;i<lstObject.size();i++)
        {
            field.add(lstObject[i].QualifiedApiName);

        }
        return field;
    }

    @AuraEnabled(cacheable=true)
    public static string getVFOrigin() {
      string vfOrigin = '';
    string baseURL = URL.getOrgDomainUrl().toExternalForm(); 
    vfOrigin = baseURL.split('.my.')[0] + '--c.' + 'vf.force.com';
 
    return vfOrigin;
    }
    
}