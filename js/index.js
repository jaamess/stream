document.addEventListener('DOMContentLoaded', () => {
    sortSideMenu();
    let summary = {};

    // Fetch the JSON file
    fetch('/assets/database/movies.json')
        .then(response => response.json())
        .then(data => {
            // Map the titles to their corresponding descriptions
            data.movies.forEach(movie => {
                summary[movie.title] = movie.description;
            });

            // Define the changeVideo function after loading the JSON
            window.changeVideo = function (source, title, descriptionKey, hasCustomSubtitles = false, subFile = '', subLabel = '') {
                let video = document.getElementById('videoPlayer');
                const shows = ['tv'];
                let url = '';

                // Check if the source is a TV show or a movie and construct the base URL
                if (!shows.some(show => source.includes(show))) {
                    url = `https://vidsrc.to/embed/movie/${source}`;
                } else {
                    url = `https://vidsrc.to/embed/${source}`;
                }

                // If the video has custom subtitles, append the subtitle parameters to the URL
                if (hasCustomSubtitles) {
                    url += `&sub=${subFile}&label=${subLabel}`;
                }

                // Update the iframe URL
                video.src = url;

                // Update the video title and description
                document.querySelector('.video-title').innerText = title;
                document.querySelector('.video-description').innerText = summary[descriptionKey] || 'No description available.';
            }
        })
        .catch(error => console.error('Error loading JSON file:', error));

    const sideMenu = document.getElementById('sideMenu');
    const burgerButton = document.querySelector('.burger-button');
    const darkModeToggle = document.getElementById('darkModeToggle');

    burgerButton.addEventListener('click', () => {
        sideMenu.classList.toggle('open');
    });

    // Close the side menu when a menu item is clicked
    document.querySelectorAll('.side-menu ul li').forEach(item => {
        item.addEventListener('click', () => {
            sideMenu.classList.remove('open');
        });
    });

    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', darkModeToggle.checked);
    });
});

function toggleMenu() {
    document.getElementById('sideMenu').classList.toggle('open');
}

function changePoster(posterSrc) {
    const poster = document.createElement('img');
    poster.src = posterSrc;
    poster.classList.add('poster');
    document.querySelector('.content').appendChild(poster);
}

function hidePoster() {
    const poster = document.querySelector('.content .poster');
    if (poster) {
        poster.remove();
    }
}

function toggleFullScreen() {
    const videoContainer = document.querySelector('.video-container');
    if (!document.fullscreenElement) {
        videoContainer.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

function sortSideMenu() {
    const menu = document.querySelector('.scrollable');
    Array.from(menu.getElementsByTagName('li'))
        .sort((a, b) => a.textContent.localeCompare(b.textContent))
        .forEach(li => menu.appendChild(li));
}

const burgerButton = document.querySelector('.burger-button');

burgerButton.addEventListener('click', () => {
    toggleMenu();
});

