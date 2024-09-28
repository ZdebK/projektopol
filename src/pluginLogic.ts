async function redirectToUrl() {
    const apiGatewayUrl = 'https://your-api-gateway-url.amazonaws.com/prod'; // Replace with your actual API Gateway URL

    // The payload or data you want to send to the Lambda function
    const data = {
        key1: 'value1',
        key2: 'value2'
    };

    try {
        // Send a POST request to the API Gateway URL
        const response = await fetch(apiGatewayUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'your-api-key' // If your API Gateway requires an API key
            },
            body: JSON.stringify(data)
        });

        // Check if the request was successful
        if (response.ok) {
            const result = await response.json();
            console.log('Success:', result);

            // If needed, redirect based on Lambda response
            // For example, if the Lambda returns a redirect URL
            if (result.redirectUrl) {
                window.location.href = result.redirectUrl;
            } else {
                // Handle other response scenarios
                alert('Lambda function executed successfully');
            }
        } else {
            console.error('Error:', response.statusText);
            alert('Error calling Lambda function');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Request failed');
    }
}