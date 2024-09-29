import { check } from "./check.mjs";

export const handler = async (event) => {
    
    let body = JSON.parse(event.body);
    console.log(body)
    // Extract the URL from the event input
    const url = body.url;
    
    // if(dataDomain[0].creation_date.toJsDate())
    
    return await check(url);
};