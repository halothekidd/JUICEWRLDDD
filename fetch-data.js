// Example API call in fetch-data.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://juicewrldapi.com/your-endpoint') // Replace with actual endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Example: insert data into a section with ID 'results'
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Clear previous results
            data.forEach(item => {
                const div = document.createElement('div');
                div.textContent = item.song_title; // Adjust based on your data structure
                resultsDiv.appendChild(div);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});
