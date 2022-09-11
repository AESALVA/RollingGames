
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const iconBars = document.getElementById('bars'); //Selecciono el icono bars = hamburguesa
const iconCross = document.getElementById('cross'); //Selecciono el icono cross



navToggle.addEventListener("click", () => {
    /*le agrego o le saco la clase 'nav-menu-link-visible', esto hace que se
    puede visualizar o no  el menu que esconde el boton hamburguesa*/
    navMenu.classList.toggle('nav-menu-link-visible');
    iconBars.classList.toggle('hide');

    /*Muestro o no el icono Cross*/
    if(iconCross.classList.contains('hide')) {
        iconCross.classList.remove('hide');
        iconCross.className= "visible"
    } else {
        iconCross.classList.remove('visible');
        iconCross.className= "hide";
    }
    
    /*Mejora de accesibilidad*/
    if(navMenu.classList.contains('nav-menu-link-visible')) {
        navToggle.setAttribute("aria-label", "Cerrar menú");
    } else {
        navToggle.setAttribute("aria-label", "Abrir menú");
    }
});


const menuLogin = document.getElementById('menuLogin');
const menuInsideLogin = document.getElementById('menuInsideLogin');

menuLogin.addEventListener('click', (e)=> {
    /*tomo la opcion del login*/
    const optionLogin = e.path[0];
    if(!optionLogin.classList.contains('nav-menu-link-inside')) {
        menuInsideLogin.classList.toggle('hide');
    }
});

menuInsideLogin.addEventListener('mouseleave', () => {
    menuInsideLogin.classList.toggle('hide');
});



