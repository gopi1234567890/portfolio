const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

function init() {
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5,
            opacity: Math.random(),
            blink: Math.random() * 0.02
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        star.opacity += star.blink;
        if (star.opacity > 1 || star.opacity < 0) star.blink *= -1;
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
// Select all project cards and overlays
// ... (Keep your existing canvas code as is) ...

// Select all project cards
const projectCards = document.querySelectorAll('.project-card');
// Select ALL overlays (since you have multiple in your HTML)
const overlays = document.querySelectorAll('.card-overlay');

projectCards.forEach(card => {
    const expandBtn = card.querySelector('.expand-btn');
    if (!expandBtn) return;

    const toggleCard = () => {
        // 1. Toggle the active class on the card
        const isActive = card.classList.toggle('active');
        
        // 2. Find the parent section (e.g., #experience or #projects)
        const parentSection = card.closest('section');
        
        // 3. Find the specific overlay that is a sibling to this card
        // (Assumes <div class="card-overlay"> follows the card immediately)
        const overlay = card.nextElementSibling; 

        if (isActive) {
            expandBtn.textContent = 'Close Project';
            document.body.style.overflow = 'hidden';

            // CRITICAL FIX: Boost the parent section's z-index so it sits above Skills/Contact
            if (parentSection) {
                parentSection.style.zIndex = '10000';
                parentSection.style.position = 'relative'; // Ensure z-index applies
            }
            
            // Show the specific overlay for this card
            if (overlay && overlay.classList.contains('card-overlay')) {
                overlay.style.display = 'block';
            }

        } else {
            expandBtn.textContent = 'View More';
            document.body.style.overflow = 'auto';

            // RESET the parent section's z-index
            if (parentSection) {
                parentSection.style.zIndex = ''; // Go back to CSS default
            }

            // Hide the overlay
            if (overlay && overlay.classList.contains('card-overlay')) {
                overlay.style.display = 'none';
            }
        }
    };

    expandBtn.addEventListener('click', toggleCard);
});

// Update the Close Logic for Overlays
overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
        const activeCard = document.querySelector('.project-card.active');
        if (activeCard) {
            // Trigger the click on the button to run the close logic defined above
            const btn = activeCard.querySelector('.expand-btn');
            if (btn) btn.click();
        }
    });
});

// Update Escape Key Logic
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeCard = document.querySelector('.project-card.active');
        if (activeCard) {
            const btn = activeCard.querySelector('.expand-btn');
            if (btn) btn.click();
        }
    }
});
// Close the active card when overlay is clicked
cardOverlay.addEventListener('click', () => {
    const activeCard = document.querySelector('.project-card.active');
    if (!activeCard) return;

    const activeBtn = activeCard.querySelector('.expand-btn');
    activeCard.classList.remove('active');
    if (activeBtn) activeBtn.textContent = 'View More';
    cardOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close active card on Escape key press
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeCard = document.querySelector('.project-card.active');
        
        if (activeCard) {
            // 1. Remove the active class
            activeCard.classList.remove('active');

            // 2. Reset the button text
            const activeBtn = activeCard.querySelector('.expand-btn');
            if (activeBtn) activeBtn.textContent = 'View More';

            // 3. Hide the overlay and enable scrolling again
            const cardOverlay = document.querySelector('.card-overlay');
            if (cardOverlay) cardOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
});


init();
animate();