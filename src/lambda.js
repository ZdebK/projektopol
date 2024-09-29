import { check } from "./check";

exports.handler = async (event) => {
    
    // Extract the URL from the event input
    const url = event.url;
    return await check(url);
};