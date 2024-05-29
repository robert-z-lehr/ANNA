document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('userQuery').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if inside a form
            fetchResponse('analogy');
        }
    });
    document.getElementById('submitBtn').addEventListener('click', function() {
        fetchResponse('analogy');
    });
});

function fetchResponse(category) {
    let userQuery = document.getElementById('userQuery').value;
    console.log("User query entered: ", userQuery); // Log user input

    if (!userQuery.trim()) {
        alert("Please enter a query.");
        console.log("No query entered."); // Log empty query attempt
        return;
    }

    let modifiedQuery;
    switch (category) {
        case 'analogy':
            modifiedQuery = "Take on the role of an expert at using analogies to provide intuitive and relatable understanding. For the following statement, generate three distinct analogies, each starting  with the text 'Analogy 1', 'Analogy 2', or 'Analogy 3', respectively: " + userQuery;
            break;
        case 'metaphor':
            modifiedQuery = "Take on the role of an expert at using metaphors to provide intuitive and relatable understanding. For the following statement, generate three distinct metaphors, each starting  with the text 'Metaphor 1', 'Metaphor 2', or 'Metaphor 3', respectively: " + userQuery;
            break;
        case 'simile':
            modifiedQuery = "Take on the role of an expert at using similes to provide intuitive and relatable understanding. For the following statement, generate three distinct similes, each starting  with the text 'Simile 1', 'Simile 2', or 'Simile 3', respectively: " + userQuery;
            break;
        case 'parable':
            modifiedQuery = "Take on the role of an expert at using parables to provide intuitive and relatable understanding. For the following statement, generate three distinct parables, each starting  with the text 'Parable 1', 'Parable 2', or 'Parable 3', respectively: " + userQuery;
            break;
        case 'aphorism':
            modifiedQuery = "Take on the role of an expert at using aphorisms to provide intuitive and relatable understanding. For the following statement, generate three distinct aphorisms, each starting  with the text 'Aphorism 1', 'Aphorism 2', or 'Aphorism 3', respectively: " + userQuery;
            break;
        default:
            console.error('Unknown category:', category);
            return;
    }

    console.log("Modified query for category " + category + ": ", modifiedQuery); // Log modified query

    // Show loading message
    document.getElementById('loadingMessage').style.display = 'block';
    document.getElementById('responseArea').style.display = 'none';

    console.log("Sending query to backend API for category " + category + "."); // Log API request initiation

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
                switch (category) {
                    case 'analogy':
                        document.getElementById('analogyResponse').innerHTML = formatResponse(content, 'Analogy');
                        fetchResponse('metaphor');
                        break;
                    case 'metaphor':
                        document.getElementById('metaphorResponse').innerHTML = formatResponse(content, 'Metaphor');
                        fetchResponse('simile');
                        break;
                    case 'simile':
                        document.getElementById('simileResponse').innerHTML = formatResponse(content, 'Simile');
                        fetchResponse('parable');
                        break;
                    case 'parable':
                        document.getElementById('parableResponse').innerHTML = formatResponse(content, 'Parable');
                        fetchResponse('aphorism');
                        break;
                    case 'aphorism':
                        document.getElementById('aphorismResponse').innerHTML = formatResponse(content, 'Aphorism');
                        break;
                }
            } catch (e) {
                console.error('Error processing response: ', e); // Log processing error
                document.getElementById(category + 'Response').innerText = "Invalid response format.";
            }
        } else {
            console.log("No valid response received."); // Log invalid response case
            document.getElementById(category + 'Response').innerText = "No valid response received.";
        }
    })
    .catch(error => {
        console.error('Error:', error); // Log fetch error
        document.getElementById(category + 'Response').innerText = "Failed to fetch response.";
    })
    .finally(() => {
        // Hide loading message and show response area
        if (category === 'aphorism') { // Only hide loading message and show response area after the last category
            document.getElementById('loadingMessage').style.display = 'none';
            document.getElementById('responseArea').style.display = 'block';
        }
    });
}

function formatResponse(responseText, type) {
    console.log("Formatting response: ", responseText); // Log response formatting

    // Insert an empty line and bold tags before each numbered item
    const formattedResponse = responseText
        .replace(new RegExp(`(${type}\\s1:)`, 'g'), "<br><br><strong>$1</strong><br>")
        .replace(new RegExp(`(${type}\\s2:)`, 'g'), "<br><br><strong>$1</strong><br>")
        .replace(new RegExp(`(${type}\\s3:)`, 'g'), "<br><br><strong>$1</strong><br>");

    // Append the additional message
    const additionalMessage = `<br><br>Which of these ${type.toLowerCase()}s helped explain your question the best? If you have any specific analogous topics you can relate to the best, please include them in your query!`;
    
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