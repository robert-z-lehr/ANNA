document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('userQuery').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if inside a form
            fetchResponse();
        }
    });
    document.getElementById('submitBtn').addEventListener('click', fetchResponse);
});

function fetchResponse() {
    let userQuery = document.getElementById('userQuery').value;
    console.log("User query entered: ", userQuery); // Log user input

    if (!userQuery.trim()) {
        alert("Please enter a query.");
        console.log("No query entered."); // Log empty query attempt
        return;
    }

    const modifiedQuery = "Take on the role of an expert at analogies used to provide intuitive and relatable understanding. For the following statement, generate three distinct analogies, each starting  with the text 'Analogy 1', 'Analogy 2', or 'Analogy 3', respectively: " + userQuery;
    console.log("Modified query: ", modifiedQuery); // Log modified query

    console.log("Sending query to backend API."); // Log API request initiation

    fetch("https://us-central1-anna-423302.cloudfunctions.net/processOpenAIRequest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: modifiedQuery })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Data received from API: ", data); // Log the raw data received from the API

        if (data.choices && data.choices.length > 0 && data.choices[0].message) {
            console.log("Raw message content: ", data.choices[0].message.content); // Log the message content

            try {
                const content = data.choices[0].message.content;
                // Assuming the content is plain text, we will use it directly for all categories
                document.getElementById('analogyResponse').innerHTML = formatResponse(content);
                document.getElementById('metaphorResponse').innerHTML = formatResponse(content);
                document.getElementById('simileResponse').innerHTML = formatResponse(content);
                document.getElementById('parableResponse').innerHTML = formatResponse(content);
                document.getElementById('aphorismResponse').innerHTML = formatResponse(content);
            } catch (e) {
                console.error('Error processing response: ', e); // Log processing error
                document.getElementById('analogyResponse').innerText = "Invalid response format.";
                document.getElementById('metaphorResponse').innerText = "Invalid response format.";
                document.getElementById('simileResponse').innerText = "Invalid response format.";
                document.getElementById('parableResponse').innerText = "Invalid response format.";
                document.getElementById('aphorismResponse').innerText = "Invalid response format.";
            }
        } else {
            console.log("No valid response received."); // Log invalid response case
            document.getElementById('analogyResponse').innerText = "No valid response received.";
            document.getElementById('metaphorResponse').innerText = "No valid response received.";
            document.getElementById('simileResponse').innerText = "No valid response received.";
            document.getElementById('parableResponse').innerText = "No valid response received.";
            document.getElementById('aphorismResponse').innerText = "No valid response received.";
        }
    })
    .catch(error => {
        console.error('Error:', error); // Log fetch error
        document.getElementById('analogyResponse').innerText = "Failed to fetch response.";
        document.getElementById('metaphorResponse').innerText = "Failed to fetch response.";
        document.getElementById('simileResponse').innerText = "Failed to fetch response.";
        document.getElementById('parableResponse').innerText = "Failed to fetch response.";
        document.getElementById('aphorismResponse').innerText = "Failed to fetch response.";
    });
}

function formatResponse(responseText) {
    console.log("Formatting response: ", responseText); // Log response formatting

    // Insert an empty line before each "Analogy 2:" and "Analogy 3:"
    const formattedResponse = responseText.replace(/(Analogy\s[2-3]:)/g, "<br><br>$1");

    // Append the additional message
    const additionalMessage = `<br><br>Which of these analogies helped explain your question the best? If you have any specific analogous topics you can relate to the best, please include them in your query!`;
    
    return formattedResponse + additionalMessage;
}


function openTab(evt, tabName) {
    console.log("Opening tab: ", tabName); // Log tab opening
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) { // Corrected syntax
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) { // Corrected syntax
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Edit the returned text to separate by paragraph
// Create a separate return for metaphors, similes, parables, and aphorisms
// Print out the Analogies when the query is completed, meanwhile run the other queries and print them out when they are done
// If ^ is not possible, do analogies first, and once printed, then start the other queries.
// Create a loading message
// Append a message to the returned statement, inviting them to customize what type fo help they want by choosing a analogus topic.