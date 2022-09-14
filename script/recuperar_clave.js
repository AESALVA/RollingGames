// Selecciono los elementos HTML

const Button = document.getElementById('btn_clave');

const Email =
  document.getElementById('email_clave');


Button.addEventListener('click', (e) => {
    e.preventDefault();
    const flags= validationInput([[Email, flagEmail]]);
    if(flags[0]) {
        showAlertRecuperarPassword('error', flags[1]);
    }else {
        showAlertRecuperarPassword('success', "");
        cleanInputs([Email]);
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

Email.addEventListener('keyup', () => {
    let regExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(Email.value.match(regExp)) {
        Email.classList.remove('error');
        Email.classList.add('correct');
        flagEmail= false;
    }else {
        flagEmail= true;
        Email.classList.remove('correct');
        Email.classList.add('error');
    }
    
    if(Email.value === ""){
        Email.classList.remove('correct', 'error');
    }
});

// ---------------------------------------------------------------------------------------------------------
/**********Codigo para controlar el campo email**********/

// ---------------------------------------------------------------------------------------------------------
/**********Ventana de alerta personalizada**********/
const showAlertRecuperarPassword = (typeAlert, message) => {
    if(typeAlert === 'error') {
        Swal.fire('Alerta', message, typeAlert);
    }else if(typeAlert === "success") {
        Swal.fire('Exito', 'Se envió la clave correctamente', typeAlert);
    }
}