/**
 * LOGIN
 */

 const $btnSignIn= document.querySelector('.sign-in-btn'),
 $btnSignUp = document.querySelector('.sign-up-btn'),  
 $signUp = document.querySelector('.sign-up'),
 $signIn  = document.querySelector('.sign-in');

document.addEventListener('click', e => {
if (e.target === $btnSignIn || e.target === $btnSignUp) {
   $signIn.classList.toggle('active');
   $signUp.classList.toggle('active')
}
});

/**
 * LOGIN
 */

// Tomar control con JS de los elementos del DOM que vamos a manejar.

const email = document.getElementById('email_login');
const password =
  document.getElementById('password_login');

// Escuchar los eventos que van a dispara la acción
const btn = document
  .getElementById('boton_login')
  .addEventListener('click', e => handleClick(e));

  // Inicializo la lista de usuarios
const USERS =
JSON.parse(localStorage.getItem('USERS')) ||
[];

// Creo usuarios dummies para comparar si el logueo es correcto o no
const user_dummy_1 = { nombre:"Juan Garcia",telefono:"4917858",email: 'juan@gmail.com', password: 'juan'}
const user_dummy_2 = { nombre:"Maria Luz Diaz",telefono:"153854111",email: 'maria@gmail.com', password: 'maria'}

USERS.push(user_dummy_1);
USERS.push(user_dummy_2);

// Selecciono los elementos HTML

const newUserButton = document
  .getElementById('boton_registro')
  .addEventListener('click', () => newUser());

const newUserName =
  document.getElementById('nombre_registro');
const newUserPhone =
  document.getElementById('telefono_registro');
const newUserEmail =
  document.getElementById('email_registro');
const newUserPassword =
  document.getElementById('password_registro');

// Programo la lógica necesaria
const newUser = () => {

  if (
    newUserName.value.length<=50 &&
    newUserPhone.value.length<=12 &&
    newUserEmail.value.length<=50 &&
    newUserPassword.value.length<=40
  ) {

    const us = {
      nombre: newUserName.value,
      telefono:newUserPhone.value,
      email:newUserEmail.value,
      password:newUserPassword.value,
    
    };
    USERS.push(us);
    localStorage.setItem(
      'USERS',
      JSON.stringify(USERS)
    );
    newUserName.value='';
    newUserPhone.value='';
    newUserEmail.value='';
    newUserPassword.value='';
  
    //alert('Usuario Agregado!');
    showAlert('success', 'Usuario Agregado!');

  }else{
    //alert('Usuario No Agregado!');
    showAlert('error', 'Usuario No Agregado!');
  }

 };

// Creamos la función con la lógica
function handleClick(event) {
  // A los botones de los formularios, para controlarlos por completo, 
  //tengo que quitarles su funcion por defecto
  event.preventDefault();


  // Vamos a simular la demora de la consulta a un backend utilizando funciones de tiempo
  console.log('Validando ...');

  setTimeout(() => {
    // Creo un flag o bandera para que controle si muestro el error o redireccion en caso de validar
    let validationOk = false;

    for (let i = 0; i < USERS.length; i++) {
      // Version clasica con for
      if (
        USERS[i].email === email.value &&
        USERS[i].password === password.value
        && email.value.length<=50 && password.value.length<=40
      ) {
        validationOk = true;
        sessionStorage.setItem('login', 'true');
      
      }
    }


    if (validationOk) {
      //alert('Validado');
      showAlert('success', 'Usuario y contraseña validos');
      if(email.value==='admin@gmail.com'){
        location.href = './administrador.html';
      }
      else{
        location.href = './inicio.html';
      }
    } else {
      //alert('Usuario o contraseña incorrectos');
      showAlert('error', 'Usuario o contraseña incorrectos');
    }
  }, 1000);

  // Agrego el valor del mensaje de error con template literals, usando backticks
}

function validationSessionStorage() {
  const login = JSON.parse(
    sessionStorage.getItem('login')
  );
  console.log(login);
  if (login === true) {
    location.href = '.inicio.html';
  }
}

validationSessionStorage();

// ---------------------------------------------------------------------------------------------------------
/**********Ventana de alerta personalizada**********/
const showAlert = (typeAlert, message) => {
  if(typeAlert === 'error') {
      Swal.fire('Alerta', message, typeAlert);
  }else if(typeAlert === "success") {
      Swal.fire('Exito', message, typeAlert);
  }
}