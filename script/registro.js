// Selecciono los elementos HTML

const newUserButton = document.getElementById('boton_registro');

const newUserName =
  document.getElementById('nombre_registro');
const newUserPhone =
  document.getElementById('telefono_registro');
const newUserEmail =
  document.getElementById('email_registro');
const newUserPassword =
  document.getElementById('password_registro');

newUserButton.addEventListener('click', (e) => {
    e.preventDefault();
    const flags= validationInput([[newUserName, flagName], [newUserPhone, flagPhone], [newUserEmail, flagEmail],[newUserPassword, flagPassword]]);
    if(flags[0]) {
        showAlertRegister('error', flags[1]);
    }else {
        showAlertRegister('success', "");
        cleanInputs([newUserName, newUserPhone, newUserEmail, newUserPassword]);
    }
});


//Valido los datos ingresado por los inputs
const validationInput = (inputs) =>{
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
let flagEmail= false;

newUserEmail.addEventListener('keyup', () => {
    let regExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(newUserEmail.value.match(regExp)) {
        newUserEmail.classList.remove('error');
        newUserEmail.classList.add('correct');
        flagEmail= false;
    }else {
        flagEmail= true;
        newUserEmail.classList.remove('correct');
        newUserEmail.classList.add('error');
    }
    
    if(newUserEmail.value === ""){
        newUserEmail.classList.remove('correct', 'error');
    }
});

// ---------------------------------------------------------------------------------------------------------
/**********Codigo para controlar el campo email**********/


// ---------------------------------------------------------------------------------------------------------
/**********Codigo para controlar el campo nombre**********/
let flagName= false;

newUserName.addEventListener('keyup', () => {

    if(newUserName.value.length <= 2 || newUserName.value.length > 40) {
        newUserName.classList.remove('correct');
        newUserName.classList.add('error');
        flagName= true;
    } else {
        newUserName.classList.remove('error');
        newUserName.classList.add('correct');
        flagName= false;
    }

    if(newUserName.value === ""){
        newUserName.classList.remove('correct', 'error');
    }
});

const cleanInputs= (inputs) =>{
    inputs.forEach(input => {
        input.value= "";
        input.classList.remove('correct', 'error');
    });
};
// ---------------------------------------------------------------------------------------------------------
/**********Codigo para controlar el campo nombre**********/


// ---------------------------------------------------------------------------------------------------------
/**********Codigo para controlar el phone**********/
let flagPhone= false;

newUserPhone.addEventListener('keyup', ()=> {
    if(newUserPhone.value.length < 9 || newUserPhone.value.length > 14) {
        newUserPhone.classList.remove('correct');
        newUserPhone.classList.add('error');
        flagPhone= true;
    }else {
        newUserPhone.classList.remove('error');
        newUserPhone.classList.add('correct');
        flagPhone= false;
    }

    if(newUserPhone.value === ""){
        newUserPhone.classList.remove('correct', 'error');
    }
});
// ---------------------------------------------------------------------------------------------------------
/**********Codigo para controlar el phone**********/

// ---------------------------------------------------------------------------------------------------------
/**********Codigo para controlar el password**********/
let flagPassword= false;

newUserPassword.addEventListener('keyup', ()=> {
    if(newUserPassword.value.length < 8 || newUserPassword.value.length > 40) {
        newUserPassword.classList.remove('correct');
        newUserPassword.classList.add('error');
        flagPassword= true;
    }else {
        newUserPassword.classList.remove('error');
        newUserPassword.classList.add('correct');
        flagPassword= false;
    }

    if(newUserPassword.value === ""){
        newUserPassword.classList.remove('correct', 'error');
    }
});
// ---------------------------------------------------------------------------------------------------------
/**********Codigo para controlar el password**********/


// ---------------------------------------------------------------------------------------------------------
/**********Ventana de alerta personalizada**********/
const showAlertRegister = (typeAlert, message) => {
    if(typeAlert === 'error') {
        Swal.fire('Alerta', message, typeAlert);
    }else if(typeAlert === "success") {
        Swal.fire('Exito', 'Se agregó el usuario correctamente', typeAlert);
    }
}
