public with sharing class PdfParser {
    @AuraEnabled(cacheable=true)
    public static string parsePdf(Attachment file){
        String API_KEY='306404f8a7msh40f5229bdb5406ep108654jsnb87202318d3a';
		String boundary = 'PDF Parser';

		// header
		String header = '--' + boundary + '\nContent-Disposition: form-data; name="file"; filename="' + file.Name + '"\nContent-Type: multipart/form-data;'+'\nnon-svg='+True;
		String headerEncoded;
		do
		{
			header += ' ';
			headerEncoded = EncodingUtil.base64Encode(Blob.valueOf(header + '\r\n\r\n'));
		}
		while(headerEncoded.endsWith('='));

		// body
		String footer = '--' + boundary + '--';
		String bodyEncoded = EncodingUtil.base64Encode(file.Body);

		if (bodyEncoded.endsWith('==')) 
		{
			bodyEncoded = bodyEncoded.substring(0, bodyEncoded.length()-2) + '0K';
		}
		else if(bodyEncoded.endsWith('=')) 
		{
			bodyEncoded = bodyEncoded.substring(0, bodyEncoded.length()-1) + 'N';
			footer = '\n' + footer;           
		}
		else
		{
			footer = '\r\n' + footer;
		}

		String footerEncoded = EncodingUtil.base64Encode(Blob.valueOf(footer));
		Blob bodyBlob = EncodingUtil.base64Decode(headerEncoded + bodyEncoded + footerEncoded);
		System.debug('bodyBlob.size()' + bodyBlob.size());

		// send
		HttpRequest req = new HttpRequest();
		req.setHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
		req.setHeader('X-RapidAPI-Key', API_KEY);
		req.setHeader('X-RapidAPI-Host', 'pdf-to-text-converter.p.rapidapi.com');
		req.setEndpoint('https://pdf-to-text-converter.p.rapidapi.com/api/pdf-to-text/convert');

		req.setMethod('POST');
		req.setBodyAsBlob(bodyBlob);
		req.setHeader('Content-Length', String.valueof(req.getBodyAsBlob().size()));
		Http http = new Http();
		HTTPResponse res;
		try{
			res = http.send(req);
		} catch(Exception e){
			system.debug('+-+ error making request: '+e.getMessage());
		}
		
		return res.getBody();
	}
}