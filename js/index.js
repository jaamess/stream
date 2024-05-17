document.addEventListener('DOMContentLoaded', () => {
    sortSideMenu();
    let summary = {};

    // Fetch the JSON file
    fetch('/assets/description.json')
        .then(response => response.json())
        .then(data => {
            summary = data;

            // Define the changeVideo function after loading the JSON
            window.changeVideo = function (source, title, description, hasCustomSubtitles = false, subFile = '', subLabel = '') {
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
                    url += `?sub.file=${encodeURIComponent(subFile)}&sub.label=${encodeURIComponent(subLabel)}`;
                }

                video.src = url;
                video.title = title;

                // Update the video description
                const descriptionElement = document.querySelector('.video-description');
                if (summary[description]) {
                    descriptionElement.textContent = summary[description];
                } else {
                    descriptionElement.textContent = "Descrição indisponível.";
                }

                // Update the video title
                const titleElement = document.querySelector('.video-title');
                titleElement.textContent = title;
            };
        })
        .catch(error => console.error('Error loading JSON:', error));

    // Function to toggle the side menu
    window.toggleMenu = function () {
        const sideMenu = document.getElementById('sideMenu');
        const content = document.querySelector('.content');
        sideMenu.classList.toggle('collapsed');
        content.classList.toggle('collapsed');
    };

    // Function to toggle dark mode
    window.toggleDarkMode = function () {
        document.body.classList.toggle('dark-mode');
    };

    // Function to toggle full screen mode
    window.toggleFullScreen = function () {
        let video = document.getElementById('videoPlayer');
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari and Opera
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
            video.msRequestFullscreen();
        }
    };
});

function sortSideMenu() {
    const sideMenu = document.querySelector('.side-menu ul');
    const items = Array.from(sideMenu.getElementsByTagName('li'));
    items.sort((a, b) => a.textContent.localeCompare(b.textContent));
    sideMenu.innerHTML = ''; // Clear existing list
    items.forEach(item => sideMenu.appendChild(item)); // Reappend sorted items
}

function changePoster(posterPath) {
    const poster = document.querySelector('.menu-poster img');
    poster.src = posterPath;
}

function hidePoster() {
    const posters = document.querySelectorAll('.menu-poster');
    posters.forEach(poster => poster.style.display = 'none');
}
