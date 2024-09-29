import https from "https";

export function check(site) {
    let score = 100;


    if (!site) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: 'Error: No URL provided'}),
        };
    }
    let url = new URL(site);

    if (url.protocol !== "https:") {
        score -= 10;
    }


    const
        domain = url.hostname,
        checkDomainUrl = 'https://api.api-ninjas.com/v1/whois?domain=' + domain,
        dataDomain = [];


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

    return {
        statusCode: 200,
        body: JSON.stringify({score}),
    };
}

let result = check("http://localhost");
console.log(result)