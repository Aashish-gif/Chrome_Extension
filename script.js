async function getMatchData() {
    try {
   
        const response = await fetch("https://api.cricapi.com/v1/cricScore?apikey=0aa9be3d-64a6-41b8-9cd1-1da639057663");

        
        if (!response.ok) {
            throw new Error('Failed to fetch match data');
        }

        const data = await response.json();

      
        if (data.status !== "success") {
            throw new Error('API response was not successful');
        }

        const matchesList = data.data || [];
        
        if (matchesList.length === 0) {
            document.getElementById("matches").innerHTML = "<p>No current matches available.</p>";
            return [];
        }

       
        const relevantData = matchesList.map(match => {
            const team1 = match.team1 || "Team 1 not available";
            const team2 = match.team2 || "Team 2 not available";
            const matchDate = match.date || "Date not available";
            const winner = match.winner || "Winner not declared";

            return {
                teams: `${team1} vs ${team2}`,
                date: matchDate,
                winner: winner
            };
        });

       
        const matchListHTML = relevantData.map(match => `
            <li>
                <strong>Teams:</strong> ${match.teams} <br>
                <strong>Match Date:</strong> ${match.date} <br>
                <strong>Winner:</strong> ${match.winner}
            </li>
        `).join('');

        const matchesElement = document.getElementById("matches");
        if (matchesElement) {
            matchesElement.innerHTML = matchListHTML;
        } else {
            console.error("Element with ID 'matches' not found.");
        }

        return relevantData;
    } catch (error) {
   
        console.error("Error fetching match data:", error);
        document.getElementById("matches").innerHTML = "<p>There was an error loading the match data. Please try again later.</p>";
    }
}

getMatchData();
