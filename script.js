function showResponse(promptType, responseId) {
    var responseContainer = document.getElementById(responseId);
    responseContainer.innerHTML = ''; // Clear previous response

    var responseHTML = '';

    if (promptType === 'api') {
        responseHTML = `
            <strong>APIs Explanation:</strong><br>
            - <strong>Waiters in a restaurant:</strong> They take your order (request) to the kitchen (system/server) and bring back your food (response/data).<br><br>
            - <strong>Mail Delivery:</strong> An API is like a mail delivery system. You send out a letter (request) with a specific address (endpoint), and you receive a letter back (response) with the information you requested.<br><br>
            - <strong>Librarian:</strong> Consider an API as a librarian. You ask for a specific book (request data), and the librarian fetches it from the vast collection (server/database) and hands it over to you (response).<br><br>
            - <strong>Electricity Plug:</strong> An API is akin to an electrical outlet. Various appliances (applications) can tap into the power source (data) through a common interface (API), despite their differences.<br><br>
            - <strong>Translator:</strong> An API acts as a translator between two parties who speak different languages (different software applications), enabling them to understand each other.<br><br>
            - <strong>Menu in a Restaurant:</strong> An API is like a restaurant menu. It presents a list of dishes (services) you can order, along with a description of each dish. When you specify which dish you want, the kitchen (system) prepares the dish and serves it (returns a response).
        `;
    } else if (promptType === 'hackathon') {
        responseHTML = `
            <strong>Hackathons Explanation:</strong><br>
            Hackathons are collaborative coding events where programmers, designers, and others in the software development process come together to create a working project in a short amount of time.<br><br>
            - <strong>Brainstorming Session:</strong> A hackathon is like an intense brainstorming session, where a group of people come together to solve problems creatively and rapidly.<br><br>
            - <strong>Marathon:</strong> It's akin to a marathon for coders. Just like athletes push their limits in a race, developers push their coding skills to develop a functional prototype under time constraints.<br><br>
            - <strong>Jigsaw Puzzle Party:</strong> Imagine a group of friends coming together to solve different sections of a large jigsaw puzzle. Each contributes to the bigger picture, similar to how each participant in a hackathon contributes to building a complete software project.<br><br>
            - <strong>Cook-off Challenge:</strong> A hackathon can be likened to a cook-off challenge where chefs have limited ingredients and time to create innovative dishes, mirroring the innovation and resourcefulness needed in a hackathon.<br><br>
            - <strong>Music Jam Session:</strong> Just as musicians spontaneously create music in a jam session, developers, designers, and other participants collaboratively create software in a hackathon.
        `;
    } else if (promptType === 'philosophies') {
        responseHTML = `
            <strong>Philosophies Explanation:</strong><br>
            Understanding the differences between various economic and social philosophies can be complex. Here are some analogies to help:<br><br>
            - <strong>Gardening Styles:</strong> Capitalism is like individual gardening, where each person's effort determines their yield. Socialism can be likened to community gardening, sharing tools and harvests. Communism is like a garden where resources and yields are distributed equally by a planner, regardless of input. Fascism is a controlled garden where the type and quantity of produce are dictated, with strict control over distribution. Corporatism resembles a series of private gardens overseen by a council that decides how resources are shared among them.<br><br>
            - <strong>Household Management:</strong> Imagine different ways of managing and distributing chores and benefits within a household, representing various philosophies.<br><br>
            - <strong>School Group Projects:</strong> Consider how tasks and rewards might be allocated in school projects under different management philosophies.<br><br>
            - <strong>Team Sports:</strong> The roles, strategies, and goals in a team sport can serve as analogies for different political and economic systems. <br><br>
            - <strong>Library Systems:</strong> The way libraries are organized, funded, and serve their community can represent different governance philosophies.<br><br>
        `;
    } 
        
    // Set the innerHTML of the response container to the responseHTML.
    responseContainer.innerHTML = responseHTML;
}