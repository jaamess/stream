document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.scrollable li');
    const poster = document.createElement('img');
    poster.classList.add('menu-poster');
    document.body.appendChild(poster);

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', (event) => {
            const posterSrc = event.target.getAttribute('data-poster');
            if (posterSrc) {
                poster.src = posterSrc;
                poster.style.display = 'block';
            }
        });

        item.addEventListener('mouseleave', () => {
            poster.style.display = 'none';
        });

        item.addEventListener('mousemove', (event) => {
            const offsetX = 20;
            const offsetY = 20;
            const posterWidth = poster.offsetWidth;
            const posterHeight = poster.offsetHeight;
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            let top = event.clientY + offsetY;
            let left = event.clientX + offsetX;

            if (left + posterWidth > screenWidth) {
                left = event.clientX - posterWidth - offsetX;
            }

            if (top + posterHeight > screenHeight) {
                top = event.clientY - posterHeight - offsetY;
            }

            poster.style.top = `${top}px`;
            poster.style.left = `${left}px`;
        });
    });
});