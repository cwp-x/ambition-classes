document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    
    let currentImages = [];
    let currentIndex = 0;

    // --- TAB SWITCHING ---
    const tabButtons = document.querySelectorAll(".tab-btn");
    tabButtons.forEach(btn => {
        btn.onclick = () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            document.querySelectorAll(".gallery-content").forEach(s => s.classList.remove("active"));
            btn.classList.add("active");
            document.getElementById(btn.dataset.tab).classList.add("active");
        };
    });

    // --- LIGHTBOX ENGINE ---
    function updateImage() {
        lightboxImg.src = currentImages[currentIndex].src;
    }

    // Delegation: Click on any image inside a gallery-grid
    document.addEventListener("click", (e) => {
        if (e.target.closest(".gallery-grid img")) {
            const img = e.target;
            const grid = img.closest(".gallery-grid");
            currentImages = Array.from(grid.querySelectorAll("img"));
            currentIndex = currentImages.indexOf(img);
            
            updateImage();
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        }
    });

    const closeLightbox = () => {
        lightbox.classList.remove("active");
        document.body.style.overflow = "auto";
    };

    nextBtn.onclick = (e) => { e.stopPropagation(); currentIndex = (currentIndex + 1) % currentImages.length; updateImage(); };
    prevBtn.onclick = (e) => { e.stopPropagation(); currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length; updateImage(); };
    closeBtn.onclick = closeLightbox;
    lightbox.onclick = (e) => { if(e.target === lightbox) closeLightbox(); };

    // --- ARROW SLIDER (Main Page) ---
    document.querySelectorAll(".gallery-arrow").forEach(arrow => {
        arrow.onclick = function() {
            const wrapper = this.closest(".gallery-slider-wrapper");
            const grid = wrapper.querySelector(".gallery-grid");
            const scrollAmount = 300;
            grid.scrollBy({ left: this.classList.contains("left") ? -scrollAmount : scrollAmount, behavior: "smooth" });
        };
    });

    // Keyboard
    document.onkeydown = (e) => {
        if (!lightbox.classList.contains("active")) return;
        if (e.key === "ArrowRight") nextBtn.click();
        if (e.key === "ArrowLeft") prevBtn.click();
        if (e.key === "Escape") closeLightbox();
    };
});