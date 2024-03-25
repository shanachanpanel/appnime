// Function to fetch anime data from URL
async function fetchAnimeData() {
    try {
        const response = await fetch('https://kumanimeapi.vercel.app/api/anime/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const response = await fetch('https://kumanimeapi.vercel.app/api/episode/');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching anime data:', error);
        return [];
    }
}

// Function to render anime list
async function renderAnimeList() {
    const animeList = document.getElementById("anime-list");
    animeList.innerHTML = ""; // Clear existing list

    const animeData = await fetchAnimeData();
    animeData.forEach(anime => {
        const listItem = document.createElement("li");
        listItem.textContent = `${anime.slug} -  episode ${episode.slug}`;
        animeList.appendChild(listItem);
    });
}

// Render anime list when the page loads
window.addEventListener("load", renderAnimeList);

// Register service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('serviceworker.js')
        .then(registration => {
            console.log('Service Worker registered');
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
    });
}
