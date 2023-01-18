const sidebarBtnToggle = document.getElementById("sidebarBtnToggle");
const sidebar = document.getElementById('sidebar');
let isShown = false;

sidebarBtnToggle.addEventListener('click', () => {
    isShown = !isShown;
    sidebar.classList.add('hide-sidebar');

    if (isShown) {
        sidebarBtnToggle.classList.add('active');
        sidebar.classList.replace('hide-sidebar', 'display-sidebar');
    } else {
        sidebarBtnToggle.classList.remove('active');
        sidebar.classList.replace('display-sidebar', 'hide-sidebar');
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