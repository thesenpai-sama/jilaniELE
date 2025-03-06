document.addEventListener("DOMContentLoaded", function () {
    let searchInput = document.getElementById("search");
    let resultsContainer = document.getElementById("search-results");

    if (!searchInput || !resultsContainer) {
        console.error("Search input or results container missing!");
        return;
    }

    let remoteData = [];

    // Fetch the JSON data
    fetch("remotes.json")
        .then(response => response.json())
        .then(data => {
            remoteData = data;
            console.log("Remote data loaded:", remoteData);
        })
        .catch(error => console.error("Error fetching remote data:", error));

    searchInput.addEventListener("keyup", function () {
        let query = searchInput.value.toLowerCase().trim();
        resultsContainer.innerHTML = ""; // Clear previous results

        if (query === "") return;

        let filteredRemotes = remoteData.filter(remote => remote.name.toLowerCase().includes(query));

        if (filteredRemotes.length === 0) {
            resultsContainer.innerHTML = "<p>No results found.</p>";
            return;
        }

        filteredRemotes.forEach(remote => {
            let resultItem = document.createElement("div");
            resultItem.classList.add("search-item");

            resultItem.innerHTML = `
                <a href="${remote.link}">
                    <img src="${remote.image}" alt="${remote.name}" class="search-image">
                    <span class="search-title">${remote.name}</span>
                </a>
            `;

            resultsContainer.appendChild(resultItem);
        });
    });
});

