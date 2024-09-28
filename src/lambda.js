import  https from 'https';

exports.handler = async (event) => {
    
    // Extract the URL from the event input
    const url = event.url;
    const maximumScore = 100;


    if (!url) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Error: No URL provided' }),
        };
    }
    
    if(!url.contains("https")) {
        maximumScore -= 10
    }


    const 
        domain = new URL(url).hostname,
        checkDomainUrl =  'https://api.api-ninjas.com/v1/whois?domain=' + domain,
        dataDomain =[];
    
    
    const checkCreatedDate = new Promise((resolve, reject) => {
        https.get(checkDomainUrl, (response) => {
            let data = '';
            

            // Accumulate data chunks
            response.on('data', (chunk) => {
                data += chunk;
            });

            // Handle the end of the response
            response.on('end', () => {
              dataDomain.push(JSON.parse(data))
            });
        })
        });
    
    
    // if(dataDomain[0].creation_date.toJsDate())
    
    return maximumScore;
};