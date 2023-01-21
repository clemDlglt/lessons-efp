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
const modalOverlay = document.getElementById('modal-element');
const modal = document.querySelector('.modal');

let displayed = false;

modalBtn.addEventListener('click', () => {
    modalOverlay.classList.add('display');
    modal.classList.add('display');
    displayed = true;
});

closeModalBtn.addEventListener('click', () => { 
    modal.classList.remove('display');
    displayed = false;
});

modal.addEventListener('transitionend', () => {
    if (displayed) return;
    modalOverlay.classList.remove('display');
});
