@isTest
public class integrationFrameworkTest {
    
    static testMethod void validateSolutions()
    {
        //Dummy data Strings 
        List<String> DummyStrings = new List<String>{'DummyString1' , 'DummyString2', 'DummyString3'};
        
         Test.startTest();
        	getSolutionRecordController.getSolutions('Dummy String');
        	getSolutionRecordController.getSubSolutions('Dummy String');
        	getSolutionRecordController.getFinalSolution('Dummy String');
        	getSolutionRecordController.getComparison(DummyStrings); 
 		 Test.stopTest();
    }
    static testMethod void validateGetMetadata()
    {
        Test.startTest();
        	getMetadata.getRecords();
        Test.stopTest();
    }

}