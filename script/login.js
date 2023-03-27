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

// Inicializo la lista de usuarios
let USERS_LOGIN = [];

// Copio los usuarios del Local Storage

document.addEventListener('DOMContentLoaded', () => {
  //En el caso de que el array este cargado al localStorge
  if(localStorage.getItem('USERS') != "[]" || localStorage.getItem('USERS')) {
    USERS_LOGIN = JSON.parse(localStorage.getItem('USERS'));
  }
});

  const Button = document.getElementById('boton_login');

  Button.addEventListener('click', (e) => {
      e.preventDefault();
      const flags= validationInputLogin([[email, flagEmailLogin],[password, flagPasswordLogin]]);
      if(flags[0]) {
          showAlert('error', flags[1]);
      }else {
          showAlert('success', "");
          let validationOk = false;

          let user = {};
      
          for (let i = 0; i < USERS_LOGIN.length; i++) {
            // Version clasica con for
            if (
              USERS_LOGIN[i].email === email.value &&
              USERS_LOGIN[i].password === password.value
            ) {
              validationOk = true;
              user = USERS_LOGIN[i];
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
          cleanInputsLogin([email, password]);
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
  

function validationSessionStorage() {
  const login = JSON.parse(
    sessionStorage.getItem('login')
  );
  console.log(login);
  if (login === true) {
    location.href = './inicio.html';
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

const cleanInputsLogin= (inputs) =>{
  inputs.forEach(input => {
      input.value= "";
      input.classList.remove('correct', 'error');
  });
};