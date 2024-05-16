// function fetchResponse() { // Define the function fetchResponse that handles the process of sending a user query to the OpenAI API and displaying the response.

//     const apiKey = "OPENAI_API_KEY";  // This is the key retrieved from Secret Manager
//     let userQuery = document.getElementById('userQuery').value; // Retrieve the value entered by the user in the input field with ID 'userQuery'.

//     if (!userQuery.trim()) { // Check if the user's query is empty or only whitespace. If so, alert the user to enter a query and exit the function early.
//         alert("Please enter a query.");
//         return;
//     }

//     fetch("https://api.openai.com/v1/chat/completions", { // Use the fetch API to send a POST request to OpenAI's chat completions endpoint.
//         method: "POST", // Specify the method as POST.
//         headers: {
//             "Content-Type": "application/json", // Set the content type of the request to JSON.
//             "Authorization": `Bearer ${apiKey}`  // This is the openai API key environment variable
//         },
//         body: JSON.stringify({ // Convert the request body into a JSON string.
//             model: "gpt-4", // Specify the model to use to be 'gpt-4'. Choose other models depending on needs.
//             messages: [{ // Provide an array of messages.
//                 "role": "user", // Set the role of the message to 'user'.
//                 "content": userQuery // Set the content of the message to the user's query.
//             }]
//         })
//     })

//     .then(response => response.json()) // Convert the response from the server into JSON format.
//     .then(data => {
//         if (data.choices && data.choices.length > 0 && data.choices[0].message) { // Check if the data includes a 'choices' array with at least one choice and a message content.
//             document.getElementById('responseArea').innerText = data.choices[0].message.content;
//         } else {
//             document.getElementById('responseArea').innerText = "No valid response received."; // If valid data is received, update the text of the HTML element with ID 'responseArea' with the response content. // Handles cases where no valid response is returned
//         }
//     })
//     .catch(error => {
//         console.error('Error:', error); // If an error occurs during the fetch operation, log the error to the console and update 'responseArea' to indicate a failed fetch operation.
//         document.getElementById('responseArea').innerText = "Failed to fetch response.";
//     });
// }

//________________________________________________________________________________________________________________________________________________
// Temporary test, recommended by ChatGPT4

function fetchResponse() {
    let userQuery = document.getElementById('userQuery').value;
    if (!userQuery.trim()) {
        alert("Please enter a query.");
        return;
    }

    fetch("https://YOUR_CLOUD_FUNCTION_URL", { // Replace with the actual URL of your deployed Cloud Function
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userQuery })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('responseArea').innerText = data.choices[0].message.content;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('responseArea').innerText = "Failed to fetch response.";
    });
}
