public with sharing class MotiveTask27_2_23 { 
    
    @AuraEnabled(cacheable=true)
    public static List<String> getObjects(){
        
        Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe(); 
        List<String> AllObjects = new List<String>();
        
        for(Schema.SObjectType d : gd.values()){
            Schema.DescribeSObjectResult ds = d.getDescribe();
            
            if(!ds.isCreateable())
                continue;
            
            AllObjects.add(ds.getName());           
        }       
        return AllObjects;
    }
    
    
    @AuraEnabled(cacheable=true)
    public static List<sObject> getRecords(String objName){
        
        String FIRST_STRING = 'SELECT Id,Name,CreatedDate From ';
        String SECOND_STRING = objName;
        String THIRD_STRING = ' ORDER BY CreatedDate DESC';
        
        String query = FIRST_STRING + SECOND_STRING + THIRD_STRING;
        
        List<sObject> sobjList = Database.query(query);        
        return sobjList;
    }
    
    
    @AuraEnabled
    public static String CreateRecord(String Name, String objName){
        system.debug('Name: '+Name + 'objName: '+objName);
        
        String ReturnString = '';
                
        if(objName =='Account'){
            Account acc = new Account();
            acc.Name=Name;
            insert acc;
            ReturnString = 'Record Created Successfully';
        }
        return ReturnString;
    }
    
}