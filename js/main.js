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
    // 3. Compteurs animés (IntersectionObserver) [2, 5]
    const counterOptions = { threshold: 0.5 }; // Se déclenche quand 50% de l'élément est visible

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target'); // Récupère la valeur cible [4]
                let count = 0;
                const speed = 100; // Vitesse de l'animation
                
                const updateCount = () => {
                    const increment = target / speed;
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter); // On arrête d'observer après l'animation
            }
        });
    }, counterOptions);

    document.querySelectorAll('.stat-number').forEach(num => counterObserver.observe(num));

    // 4. Apparition des sections en fondu (Fade-in) [2, 4, 9]
    const fadeOptions = { threshold: 0.2 };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Ajoute la classe CSS d'apparition [2]
                fadeObserver.unobserve(entry.target);
            }
        });
    }, fadeOptions);

    document.querySelectorAll('.fade-in').forEach(section => fadeObserver.observe(section));

    // 5. Année dynamique pour le Footer [10, 11]
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
})
