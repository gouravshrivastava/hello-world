public with sharing class CreateClassTool {
	//final String endpoint = 'https://na1.salesforce.com/services/data/v56.0/tooling/sobjects';
	private String getResponse(HttpRequest req) {
		try {
			Http httpreq = new Http();
			HttpResponse res = httpreq.send(req);
			String reqresponse = res.getBody();
			return reqresponse;
		} catch (Exception e) {
			return 'Error:' + e.getMessage();
		}
	}

	private HttpRequest createHttpRequest(String endpoint, String method) {
		HttpRequest req = new HttpRequest();
		System.debug(UserInfo.getOrganizationId()+''+UserInfo.getSessionId().SubString(15));
		system.debug(UserInfo.getUserName());
		req.setEndpoint('callout:Tooling_API'+endpoint);
		system.debug(req.getEndpoint());
		req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionID());
		req.setHeader('Content-Type', 'application/json');
		
		req.setMethod(method);
		return req;
	}
	public void createApexClass(String Payload) {
		system.debug('In Create Class');
		HttpRequest req = createHttpRequest('/services/data/v56.0/tooling/sobjects/ApexClass', 'POST');
		req.setbody(Payload);
		String response = getResponse(req);
		system.debug(response);
	}
	public void createApexTrigger(String Payload) {
		HttpRequest req = createHttpRequest('/services/data/v56.0/tooling/sobjects/ApexTrigger', 'POST');
		req.setbody(Payload);
		String response = getResponse(req);
		system.debug(response);
	}

}