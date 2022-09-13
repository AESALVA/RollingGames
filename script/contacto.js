const buttonForm= document.getElementById('buttonForm');
const inputName = document.getElementById('nombre');
const inputEmail= document.getElementById('email');
const textAreaMessage= document.getElementById('mensaje');

buttonForm.addEventListener('click', (e) => {
    e.preventDefault();
    const flags= validationInput([[inputName, flagName], [inputEmail, flagEmail], [textAreaMessage, flagTextArea]]);
    if(flags[0]) {
        showAlert('error', flags[1]);
    }else {
        showAlert('success', "");
        cleanInputs([inputName, inputEmail, textAreaMessage]);
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
const icon1Email= document.querySelector(".icon1-email");
const icon2Email= document.querySelector(".icon2-email");
const iconsEmail= document.querySelector(".icons-email");
let flagEmail= false;

inputEmail.addEventListener('keyup', () => {
    let regExp = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    iconsEmail.classList.toggle('hide');

    if(inputEmail.value.match(regExp)) {
        inputEmail.classList.remove('error');
        inputEmail.classList.add('correct');
        icon1Email.style.display="block";
        icon2Email.style.display="none";
        flagEmail= false;
    }else {
        flagEmail= true;
        inputEmail.classList.remove('correct');
        inputEmail.classList.add('error');
        icon1Email.style.display="none";
        icon2Email.style.display="block";
    }
    
    if(inputEmail.value === ""){
        inputEmail.classList.remove('correct', 'error');
    }
});


// ---------------------------------------------------------------------------------------------------------
/**********Codigo para controlar el campo nombre**********/
const icon1Name= document.querySelector(".icon1-text");
const icon2Name= document.querySelector(".icon2-text");
const iconsName= document.querySelector(".icons-text");
let flagName= false;

inputName.addEventListener('keyup', () => {
    iconsName.classList.toggle('hide');

    if(inputName.value.length <= 2 || inputName.value.length > 40) {
        inputName.classList.remove('correct');
        inputName.classList.add('error');
        icon1Name.style.display="none";
        icon2Name.style.display="block";
        flagName= true;
    } else {
        inputName.classList.remove('error');
        inputName.classList.add('correct');
        icon1Name.style.display="block";
        icon2Name.style.display="none";
        flagName= false;
    }

    if(inputName.value === ""){
        inputName.classList.remove('correct', 'error');
    }
});

const cleanInputs= (inputs) =>{
    inputs.forEach(input => {
        input.value= "";
        input.classList.remove('correct', 'error');
    });
};

// ---------------------------------------------------------------------------------------------------------
/**********Codigo para controlar el textarea**********/
let flagTextArea= false;

textAreaMessage.addEventListener('keyup', ()=> {
    if(textAreaMessage.value.length < 10 || textAreaMessage.value.length > 255) {
        textAreaMessage.classList.remove('correct');
        textAreaMessage.classList.add('error');
        flagTextArea= true;
    }else {
        textAreaMessage.classList.remove('error');
        textAreaMessage.classList.add('correct');
        flagTextArea= false;
    }

    if(textAreaMessage.value === ""){
        textAreaMessage.classList.remove('correct', 'error');
    }
});

// ---------------------------------------------------------------------------------------------------------
/**********Ventana de alerta personalizada**********/
const showAlert = (typeAlert, message) => {
    if(typeAlert === 'error') {
        Swal.fire('Alerta', message, typeAlert);
    }else if(typeAlert === "success") {
        Swal.fire('Exito', 'Se mando el mensaje correctamente', typeAlert);
    }
}