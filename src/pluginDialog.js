async function redirectToUrl() {
    // Change the button class to "disabled"
    const button = document.getElementById("toggle-btn");

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
                document.getElementById('toggle-btn').innerText = `SiteCheck :${data.siteSecurityCheck} %`;

                if (data.siteSecurityCheck < 50)
                    document.getElementById('toggle-btn').classList.add("bad");
                else if (data.siteSecurityCheck > 50 && data.siteSecurityCheck < 75) {
                    document.getElementById('toggle-btn').classList.add("warn");
                }
                else if (data.siteSecurityCheck > 75)
                    document.getElementById('toggle-btn').classList.add("ok");

            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                document.getElementById('toggle-btn').innerText = 'Error fetching cat fact!';
            });
    } catch (error) {
        console.error('Error:', error);
        alert('Request failed');
    }
}
