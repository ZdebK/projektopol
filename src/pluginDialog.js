async function redirectToUrl() {
    // Change the button class to "disabled"
    const button = document.getElementById("toggle-btn");
    button?.classList.add("disabled"); // Add disabled class
    button?.classList.remove("clickable"); // Remove clickable class

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
                document.getElementById('output-info').innerText = data.fact;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                document.getElementById('output-info').innerText = 'Error fetching cat fact!';
            });
    } catch (error) {
        console.error('Error:', error);
        alert('Request failed');
    }
}
