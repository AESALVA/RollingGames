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

  const Button = document.getElementById('boton_login');

  Button.addEventListener('click', (e) => {
      e.preventDefault();
      const flags= validationInputLogin([[email, flagEmailLogin],[password, flagPasswordLogin]]);
      if(flags[0]) {
          showAlert('error', flags[1]);
      }else {
          showAlert('success', "");
          cleanInputs([email, password]);
      }
  });
  
  
  //Valido los datos ingresado por los inputs
  const validationInputLogin = (inputs) =>{
      let flag= false;
      let messageError= "";
  
  
      for(let i = 0; i < inputs.length; i++){
          //Para controlar los campos vacios
          if(inputs[i][0].value === "") {
              messageError = `Debe completar el campo ${inputs[i][0].placeholder}`;
          }//Para controlar el campo nombre
          else if(inputs[i][1]) { 
              messageError = `El campo ${inputs[i][0].placeholder} es invalido`;
          }
          if(messageError.length != 0) {
              flag= true;
              break;
          }
      }
  
      return [flag, messageError];
  };
  
  
  // ---------------------------------------------------------------------------------------------------------
  /**********Codigo para controlar el campo email**********/
  let flagEmailLogin= false;
  
  email.addEventListener('keyup', () => {
      let regExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  
      if(email.value.match(regExp)) {
          email.classList.remove('error');
          email.classList.add('correct');
          flagEmailLogin= false;
      }else {
          flagEmailLogin= true;
          email.classList.remove('correct');
          email.classList.add('error');
      }
      
      if(email.value === ""){
          email.classList.remove('correct', 'error');
      }
  });
  
  // ---------------------------------------------------------------------------------------------------------
  /**********Codigo para controlar el campo email**********/
  
  
  
  // ---------------------------------------------------------------------------------------------------------
  /**********Codigo para controlar el password**********/
  let flagPasswordLogin= false;
  
  password.addEventListener('keyup', ()=> {
      if(password.value.length < 8 || password.value.length > 40) {
          password.classList.remove('correct');
          password.classList.add('error');
          flagPasswordLogin= true;
      }else {
          password.classList.remove('error');
          password.classList.add('correct');
          flagPasswordLogin= false;
      }
  
      if(password.value === ""){
          password.classList.remove('correct', 'error');
      }
  });
  // ---------------------------------------------------------------------------------------------------------
  /**********Codigo para controlar el password**********/
  

  // Inicializo la lista de usuarios
let USERS = [];


// Creo usuarios dummies para comparar si el logueo es correcto o no
const user_dummy_1 = { nombre:"Juan Garcia",telefono:"4917858",email: 'juan@gmail.com', password: 'juan1234', es_admin:false}
const user_dummy_2 = { nombre:"Maria Luz Diaz",telefono:"153854111",email: 'maria@gmail.com', password: 'maria1234',es_admin:true}


document.addEventListener('DOMContentLoaded', () => {
  //En el caso de que el array no este cargado al localStorge
  if(localStorage.getItem('USERS') == "[]" || !localStorage.getItem('USERS')) {

    USERS.push(user_dummy_1);

    USERS.push(user_dummy_2);
    
    localStorage.setItem('USERS', JSON.stringify(USERS));
  }

  USERS= JSON.parse(localStorage.getItem('USERS'));
});

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
    us.es_admin = false;
    USERS.push(us);
    localStorage.setItem(
      'USERS',
      JSON.stringify(USERS)
    );
    newUserName.value='';
    newUserPhone.value='';
    newUserEmail.value='';
    newUserPassword.value='';
  
    showAlert('success', 'Usuario Agregado!');

  }else{
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

    let user = {};

    for (let i = 0; i < USERS.length; i++) {
      // Version clasica con for
      if (
        USERS[i].email === email.value &&
        USERS[i].password === password.value
      ) {
        validationOk = true;
        user = USERS[i];
        sessionStorage.setItem('login', 'true');
      
      }
    }


    if (validationOk) {
      showAlert('success', 'Usuario y contraseña validos');
      if(user.es_admin === true){
        location.href = './administrador.html';
      }
      else{
        location.href = './inicio.html';
      }
    } else {
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