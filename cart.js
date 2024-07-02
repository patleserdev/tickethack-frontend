fetch('./includes/header.html')
            .then(response => response.text())
            .then(data => {
                // Insert the HTML into the div
                document.getElementById('nav').innerHTML = data;
            })
            .catch(error => console.error('Error loading HTML:', error));