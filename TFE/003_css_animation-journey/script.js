const sidebarBtnToggle = document.getElementById("sidebarBtnToggle");
const sidebar = document.getElementById('sidebar');
let isShown = false;

sidebar.classList.add('hide');

sidebarBtnToggle.addEventListener('click', () => {
    isShown = !isShown;

    if (isShown) {
        sidebarBtnToggle.classList.add('active');
        sidebar.classList.replace('hide', 'display');
    } else {
        sidebarBtnToggle.classList.remove('active');
        sidebar.classList.replace('display', 'hide');
    }
});

const modalBtn = document.getElementById("modalBtn");
const closeModalBtn = document.getElementById('clode-modal-btn');
const modal = document.getElementById('modal-element');

modalBtn.addEventListener('click', () => {
    modal.classList.add('display');
});

closeModalBtn.addEventListener('click', () => { 
    modal.classList.remove('display');
});