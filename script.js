document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalCloseButton = document.querySelector('.close-button');
    const body = document.body;

    // Modal content elements
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalChallenges = document.getElementById('modal-challenges');
    const modalLearnings = document.getElementById('modal-learnings');
    const modalLinks = document.getElementById('modal-links');
    const modalTechs = document.getElementById('modal-techs');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Get data from data-* attributes
            const title = card.dataset.title;
            const img = card.dataset.img;
            const desc = card.dataset.desc;
            const challenges = card.dataset.challenges;
            const learnings = card.dataset.learnings;
            const links = card.dataset.links;
            const techLogosHTML = card.querySelector('.tech-logos').innerHTML;

            // Populate modal
            modalTitle.textContent = title;
            modalImg.src = img;
            modalImg.alt = `${title} project image`;
            modalDesc.textContent = desc;
            modalChallenges.textContent = challenges;
            modalLearnings.textContent = learnings;
            modalLinks.innerHTML = links;
            modalTechs.innerHTML = techLogosHTML;

            // Show modal
            body.classList.add('modal-active');
        });
    });

    const closeModal = () => {
        body.classList.remove('modal-active');
    };

    // Close modal via button
    modalCloseButton.addEventListener('click', closeModal);

    // Close modal by clicking on the overlay
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && body.classList.contains('modal-active')) {
            closeModal();
        }
    });

    // Scroll reveal animation for project cards
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 100); // Stagger the animation if multiple cards appear at once
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }); // Requires 20% of the card to be visible

    projectCards.forEach(card => observer.observe(card));

    // Scroll spy for navigation dots
    const sections = document.querySelectorAll('section');
    const navDots = document.querySelectorAll('.scroll-dot');

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navDots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.getAttribute('href') === `#${id}`) {
                        dot.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: "-20% 0px -40% 0px" }); // Adjusted to work with very tall sections

    sections.forEach(section => spyObserver.observe(section));

    // Add click listener for immediate visual feedback on the dots
    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            navDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });
});