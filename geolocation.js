// Register on https://ipinfo.io/, after signing in just copy the token

fetch('https://ipinfo.io/json?token=YOUR_TOKEN_HERE')
  .then(response => response.json())
  .then(data => {
    // Log the full response data (optional)
    console.log(data);
    
    // Check if the user is from Italy using the ISO country code 'IT'
    if (data.country === 'IT') {
      console.log("User from Italy");
    } else {
      console.log("User is not in Italy");
    }
  })
  .catch(error => console.error('Error fetching IP info:', error));
