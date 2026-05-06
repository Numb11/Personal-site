document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalCloseButton = document.querySelector('.close-button');
    const body = document.body;

    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalChallenges = document.getElementById('modal-challenges');
    const modalLearnings = document.getElementById('modal-learnings');
    const modalLinks = document.getElementById('modal-links');
    const modalTechs = document.getElementById('modal-techs');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.dataset.title;
            const img = card.dataset.img;
            const desc = card.dataset.desc;
            const challenges = card.dataset.challenges;
            const learnings = card.dataset.learnings;
            const links = card.dataset.links;
            const techLogosHTML = card.querySelector('.tech-logos').innerHTML;

            modalTitle.textContent = title;
            modalImg.src = img;
            modalImg.alt = `${title} project image`;
            modalDesc.textContent = desc;
            modalChallenges.textContent = challenges;
            modalLearnings.textContent = learnings;
            modalLinks.innerHTML = links;
            modalTechs.innerHTML = techLogosHTML;

            body.classList.add('modal-active');
        });
    });

    const closeModal = () => {
        body.classList.remove('modal-active');
    };

    modalCloseButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && body.classList.contains('modal-active')) {
            closeModal();
        }
    });

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: "0px 0px -50px 0px" });

    projectCards.forEach(card => observer.observe(card));

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
    }, { rootMargin: "-20% 0px -40% 0px" });

    sections.forEach(section => spyObserver.observe(section));

    navDots.forEach(dot => {
        dot.addEventListener('click', function() {
            navDots.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });
});