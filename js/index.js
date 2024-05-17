document.addEventListener('DOMContentLoaded', () => {
    sortSideMenu();
    let summary = {};

    // Fetch the JSON file
    fetch('/assets/description.json')
        .then(response => response.json())
        .then(data => {
            summary = data;

            // Define the changeVideo function after loading the JSON
            window.changeVideo = function (source, title, description) {
                let video = document.getElementById('videoPlayer');
                const shows = ['tv'];
                if (!shows.some(tv => source.includes(tv))) {
                    video.src = `https://vidsrc.to/embed/movie/${source}`;
                } else {
                    video.src = `https://vidsrc.to/embed/${source}`;
                }
                video.title = title;

                // Update the video description
                const descriptionElement = document.querySelector('.video-description');
                if (summary[description]) {
                    descriptionElement.textContent = summary[description];
                } else {
                    descriptionElement.textContent = "Description not available.";
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