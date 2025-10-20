
document.addEventListener('DOMContentLoaded', () => {
    const contactButton = document.querySelector('.btn-contact-us');

    if (contactButton) {
        contactButton.addEventListener('click', () => {

            window.location.href = 'Contacto.html';
        });
    }
});
