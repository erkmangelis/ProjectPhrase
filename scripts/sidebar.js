let btn = document.querySelector("#nav-btn");
let sidebar = document.querySelector("#side-bar");

btn.onclick = function() {
    sidebar.classList.toggle("active");
};
