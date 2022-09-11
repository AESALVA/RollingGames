// ---------------------------------------------------------------------------------------------------------
/*********Codigo para el boton modificar juego**********/
const editButton= document.querySelector('.edit');

editButton.addEventListener('click', () => {
    modal.classList.add('modal--show');
});

// ---------------------------------------------------------------------------------------------------------
/*********Codigo para la carga de los archivos**********/
const button = document.querySelector('#selectedFiles');
const input = document.querySelector('#input-file');
let files;

button.addEventListener('click', (e) => {
    //Llamo al 'input-file'
    input.click();
    console.log("click");
});

input.addEventListener('change', (e) => {
    files= input.files;
    showFiles(files);
});

function showFiles(files) {
    //Caso cuando se arrastra un sólo archivo
    if(files === undefined) {
        processFile(files);
    } else {
        for(const file of files) {
            processFile(file);
        }
    }
}

function processFile(file) {
    const docType = file.type;
    const validExtensionsImages= ['image/jpeg','image/jpg','image/png','image/gif'];

    if(validExtensionsImages.includes(docType)) {
        //El archivo seleccionado es valido
        const fileReader = new FileReader();
        const id = `file-${Math.random().toString(32).substring(7)}`;

        fileReader.addEventListener('load', (e) => {
            const fileUrl = fileReader.result; //Url local

            const image = `
                <div id="${id}" class= "file-container">
                    <img src="${fileUrl}" alt="${file.name}" width= "50">
                    <div class="status">
                        <span>${file.name}</span>    
                    </div>
                </div>
            `;
            const preview= document.querySelector('.preview').innerHTML;
            document.querySelector('.preview').innerHTML = preview + image;
        });

        fileReader.readAsDataURL(file);
    } else {
        //El archivo seleccionado no es valido
        alert("No es un archivo valido");
    }
}

// ---------------------------------------------------------------------------------------------------------
/**********Codigo para mostrar y ocultar la ventana modal**********/
const openModal = document.getElementById('openModal'); //Traigo el boton para mostrar la ventana modal
const modal= document.getElementById('modal'); //Traigo la ventana modal

openModal.addEventListener('click', () => {
    /*Le saco o le añado la clase 'modal--show'*/
    modal.classList.add('modal--show');
}); 


/*Traigo el boton para cerrar el modal*/
const buttonCloseModal = document.getElementById('closeModal');

buttonCloseModal.addEventListener('click', () => closeModal());

const closeModal = () => {
    if(modifiedOrAddedGame) {
        const preview= document.querySelector('.preview');
        preview.innerHTML= "";
        cleanInputs([inputId, inputNameGame, inputSubNameGame,inputTitleGame, textAreaHistory, textAreaSummary]);
        modifiedOrAddedGame= false;
    }

    /*Le saco o le añado la clase 'modal--show'*/
    modal.classList.remove('modal--show');
}

// ---------------------------------------------------------------------------------------------------------
/**********Codigo para agregar un nuevo juego**********/

/*Traigo los datos que se añaden a traves de la ventana modal*/
const addNewGame = document.getElementById('addNewGame');
const inputId = document.getElementById('idJuego');
const inputNameGame = document.getElementById('nombreJuego');
const inputSubNameGame = document.getElementById('subtituloJuego');
const inputTitleGame = document.getElementById('tituloJuego');
const textAreaHistory = document.getElementById('historiaJuego');
const textAreaSummary = document.getElementById('resumenJuego');
let modifiedOrAddedGame = false;

addNewGame.addEventListener('click',  (e) => {
    e.preventDefault();
    
    if(!validationInput([inputId, inputNameGame, inputSubNameGame,inputTitleGame, textAreaHistory, textAreaSummary])){
        //Creo un objeto
        const newGame = {
            id: inputId.value,
            name: inputNameGame.value,
            titulo: inputTitleGame.value,
            historia: textAreaHistory.value,
            resumen: textAreaSummary.value,
        };
    
        //Muestro el juego por consola
        console.log(newGame);
        modifiedOrAddedGame= true;

        //Muestro ventana de exito
        showAlert('success', inputTitleGame.value);
        
    }
    
});

//Valido los datos ingresado por los inputs
const validationInput = (inputs) =>{
    let flag= false;
    let nameLabel= "";


    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value === "") {
            nameLabel = inputs[i].labels[0].innerText;
            flag= true;
            break;
        }
    }

    if(flag) {
        showAlert('error', nameLabel);
    }
    return flag;
};

const cleanInputs= (inputs) =>{
    inputs.forEach(input => {
        input.value= "";
    });
};

//Ventana de alerta personalizada
const showAlert = (typeAlert, message) => {
    if(typeAlert === 'error') {
        Swal.fire('Alerta', `Debe completar el campo ${message}`, typeAlert);
    }else if(typeAlert === "success") {
        Swal.fire('Exito', `Se añadio el juego ${message}`, typeAlert)
        .then((result) => {
            if (result.isConfirmed) {
                //Cierro la ventana modal
                closeModal();
             } 
        });
    }
};


