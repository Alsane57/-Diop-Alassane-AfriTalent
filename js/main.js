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
                        counter.innerText = "+" + Math.ceil(count);
                        setTimeout(updateCount, 10); // Utilisation de setTimeout [10]
                    } else {
                        counter.innerText = "+" + target;
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

    const filterBtns = document.querySelectorAll('.filter-btn');
    const freelanceCards = document.querySelectorAll('.freelance-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Gérer l'apparence des boutons
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                freelanceCards.forEach(card => {
                    // Afficher si "Tous" ou si la catégorie correspond
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

    const contactForm = document.getElementById('contactForm');

        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                // 1. Empêcher l'envoi réel du formulaire
                e.preventDefault(); 
                
                let isValid = true;
                
                // 2. Récupération des champs
                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const subject = document.getElementById('subject');
                const message = document.getElementById('message');
                
                // 3. Réinitialisation des messages et des styles
                document.querySelectorAll('.error-msg').forEach(msg => msg.textContent = '');
                document.querySelectorAll('.form-control, .form-select').forEach(input => {
                    input.classList.remove('is-invalid', 'is-valid');
                });

                // 4. Validation du Nom (requis)
                if (name.value.trim() === '') {
                    document.getElementById('nameError').textContent = 'Le nom est obligatoire.';
                    name.classList.add('is-invalid');
                    isValid = false;
                } else {
                    name.classList.add('is-valid');
                }

                // 5. Validation de l'Email (Regex obligatoire)
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value)) {
                    document.getElementById('emailError').textContent = 'Veuillez entrer un email valide.';
                    email.classList.add('is-invalid');
                    isValid = false;
                } else {
                    email.classList.add('is-valid');
                }

                // 6. Validation du Sujet
                if (subject.value === '') {
                    document.getElementById('subjectError').textContent = 'Veuillez choisir un sujet.';
                    subject.classList.add('is-invalid');
                    isValid = false;
                } else {
                    subject.classList.add('is-valid');
                }

                // 7. Validation du Message (min 20 caractères)
                if (message.value.trim().length < 20) {
                    document.getElementById('messageError').textContent = 'Le message doit contenir au moins 20 caractères.';
                    message.classList.add('is-invalid');
                    isValid = false;
                } else {
                    message.classList.add('is-valid');
                }

                // 8. Affichage du message de succès si tout est valide
                if (isValid) {
                    const successDiv = document.getElementById('successMessage');
                    successDiv.classList.remove('d-none'); // Affiche l'alerte Bootstrap
                    contactForm.reset(); // Vide le formulaire
                    
                    // Masquer le message après 5 secondes
                    setTimeout(() => {
                        successDiv.classList.add('d-none');
                    }, 5000);
                }
            });
        }
})
