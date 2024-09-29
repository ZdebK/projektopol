export async function check(site) {
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
        checkDomainUrl = 'https://api.api-ninjas.com/v1/whois?domain=' + domain;

    const response = await fetch(checkDomainUrl,
        {headers: {"X-Api-Key": "YOUR_KEY"}}
        )
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    const whoisResponse = await response.json();
    const yearAgoTimestamp = new Date(new Date().setFullYear(new Date().getFullYear() - 1)).valueOf() / 1000;
    const creationDate = whoisResponse.creation_date[0] || whoisResponse.creation_date;

    if (creationDate > yearAgoTimestamp) {
        score -= 30;
    }

    return {
        statusCode: 200,
        body: JSON.stringify({score}),
    };
}

let result = await check("https://google.com/");
console.log(result)