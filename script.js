function fetchResponse() {
    let userQuery = document.getElementById('userQuery').value;
    if (!userQuery.trim()) {
        alert("Please enter a query.");
        return;
    }

    fetch("https://us-central1-anna-423302.cloudfunctions.net/processOpenAIRequest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userQuery })
    })
    .then(response => response.json())
    .then(data => {
        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            document.getElementById('responseArea').innerText = data.choices[0].message.content;
        } else {
            document.getElementById('responseArea').innerText = "No valid response received.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseArea').innerText = "Failed to fetch response.";
    });
}
