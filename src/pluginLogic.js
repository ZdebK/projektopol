async function redirectToUrl() {
    // Change the button class to "disabled"
    const button = document.getElementById("toggle-btn");
    button?.classList.add("disabled"); // Add disabled class
    button?.classList.remove("clickable"); // Remove clickable class

    const apiGatewayUrl = 'https://your-api-gateway-url.amazonaws.com/prod'; // Replace with your actual API Gateway URL

    // The payload or data you want to send to the Lambda function
    const data = {
        key1: 'value1',
        key2: 'value2'
    };

    try {
        // Send a POST request to the API Gateway URL
        const response = fetch('https://catfact.ninja/fact')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('ouput-info').innerText = data.fact;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                document.getElementById('ouput-info').innerText = 'Error fetching cat fact!';
            });
    } catch (error) {
        console.error('Error:', error);
        alert('Request failed');
    }
}
