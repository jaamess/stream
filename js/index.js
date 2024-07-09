'use strict';

document.addEventListener('DOMContentLoaded', () => {
    sortSideMenu();
    let summary = {};

    fetch('/assets/database/movies.json')
        .then(response => response.json())
        .then(data => {
            data.movies.forEach(movie => {
                summary[movie.title] = movie.description;
            });

            window.changeVideo = function (source, title, descriptionKey, hasCustomSubtitles = false, subFile = '', subLabel = '') {
                let video = document.getElementById('videoPlayer');
                const shows = ['tv'];
                let url = '';

                if (!shows.some(show => source.includes(show))) {
                    url = `https://vidsrc.to/embed/movie/${source}`;
                } else {
                    url = `https://vidsrc.to/embed/${source}`;
                }

                if (hasCustomSubtitles) {
                    url += `&sub=${subFile}&label=${subLabel}`;
                }

                video.src = url;

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

    document.querySelectorAll('.side-menu ul li').forEach(item => {
        item.addEventListener('click', () => {
            sideMenu.classList.remove('open');
        });
    });

    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', darkModeToggle.checked);
    });

    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.addEventListener('load', () => {
        const iframeDoc = videoPlayer.contentDocument || videoPlayer.contentWindow.document;
        if (iframeDoc) {
            const script = iframeDoc.createElement('script');
            script.type = 'text/javascript';
            script.text = `
                document.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = e.target.closest('a');
                    if (target && target.href) {
                        e.stopPropagation();
                        e.preventDefault();
                    }
                }, true);
            `;
            iframeDoc.head.appendChild(script);
        }
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
    var elem = document.getElementById("videoPlayer");
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
            adjustVideoContainerPadding();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        resetVideoContainerPadding();
    }
}

function adjustVideoContainerPadding() {
    var videoContainer = document.querySelector(".video-container");
    var aspectRatio = 9 / 16;
    var screenWidth = window.innerWidth;
    var newPaddingTop = screenWidth * aspectRatio + "px";
    videoContainer.style.paddingTop = newPaddingTop;
}

function resetVideoContainerPadding() {
    var videoContainer = document.querySelector(".video-container");
    videoContainer.style.paddingTop = "56.25%"; // Reset to default value
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