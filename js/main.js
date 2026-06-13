document.addEventListener('DOMContentLoaded', () => {
    
    // On sélectionne le bouton et l'icône via leur ID
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Au chargement, on vérifie si l'utilisateur avait déjà choisi le mode sombre
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun'); // Change la lune en soleil
    }
    themeToggle.addEventListener('click', () => {
        // On bascule la classe 'dark-mode' sur le body
        document.body.classList.toggle('dark-mode');
    
        // On vérifie si le mode sombre est maintenant actif
        const isDark = document.body.classList.contains('dark-mode');
        
            // On sauvegarde le choix dans le localStorage
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // On change l'icône visuellement
            if (isDark) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
            }
    });
    // On sélectionne votre navbar avec sa classe personnalisée
    const navbar = document.querySelector('.custom-navbar');

        window.addEventListener('scroll', () => {
            // Si on a défilé de plus de 50 pixels
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled'); // On ajoute une classe CSS
            } else {
                navbar.classList.remove('navbar-scrolled'); // On la retire tout en haut
            }
        });
    // On imagine que vous avez créé un bouton avec l'ID "backToTop"
    const backToTopBtn = document.getElementById('back-to-top');

        window.addEventListener('scroll', () => {
            // Apparaît après 300px de scroll
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        // Remonte en haut avec l'effet "smooth" (doux)
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
})
