let currentImageIndex = 0 ; //index de l'image actuellement affichée
let galleryImages = [] ; // Tableau contenant les images de la galerie
function toggleDetails(element) {
    const details = element.nextElementSibling; // Sélectionne l'élément suivant (la div .details)
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block"; // Affiche les détails
        element.querySelector(".toggle").textContent = "-"; // Change le symbole à -
    } else {
        details.style.display = "none"; // Cache les détails
        element.querySelector(".toggle").textContent = "+"; // Change le symbole à +
    }
}
function openModal(src) {
    // Récupérer toutes les images visibles dans la galerie
    galleryImages = Array.from(document.querySelectorAll(".contexte-image-item"));
     // Trouver l'index de l'image cliquée
    currentImageIndex = galleryImages.findIndex(img => img.src === src);
    document.getElementById("modalImage").src = src; // Définit l'image source
    document.getElementById("imageModal").style.display = "flex"; // Affiche la modal

    // Écouteur d'événements pour la navigation par clavier
    document.addEventListener('keydown', handleKeyPress);
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none"; // Cache la modal
} 

// Fonction pour naviguer entre les images (via flèches)
function changeImage(direction) {
    // Calculer le nouvel index, en bouclant si nécessaire
    currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;

    // Mettre à jour l'image affichée dans la modal
    const modalImage = document.getElementById("modalImage");
    modalImage.src = galleryImages[currentImageIndex].src;
}

function handleKeyPress(event) {
    if(document.getElementById("imageModal").style.display === "flex") {
        if (event.key === 'ArrowRight')  {
            changeImage(1); // image suivante
        } else if (event.key === 'ArrowLeft') {
            changeImage(-1); // image précédente
        } else if (event.key === 'Escape') {
            closeModal(); // fermer la modal avec échap
        }
    }
}