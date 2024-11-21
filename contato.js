function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function loadNavlogoContato(){
    fetch('./componentes/navlogo/navlogo-contato.html')
        .then(response => response.text())
        .then(data => document.getElementById('navlogo-contato-mainpage').innerHTML = data)
}

function loadNavbar(){
    fetch('./componentes/navbar/navbar.html')
        .then(response => response.text())
        .then(data => document.getElementById('navbar-mainpage').innerHTML = data)
}

document.addEventListener('DOMContentLoaded', loadNavbar);
document.addEventListener('DOMContentLoaded', loadNavlogoContato);