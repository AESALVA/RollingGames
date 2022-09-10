/*********Codigo para el boton modificar juego**********/
const editButton= document.querySelector('.edit');

editButton.addEventListener('click', () => {
    modal.classList.add('modal--show');
});


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
        //El archivo arrastrado/seleccionado es valido
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
        //El archivo arrastrado/seleccionado no es valido
        alert("No es un archivo valido");
    }
}

/**********Codigo para mostrar y ocultar la ventana modal**********/
const addGame = document.getElementById('addGame'); //Traigo el boton para mostrar la ventana modal
const modal= document.getElementById('modal'); //Traigo la ventana modal

addGame.addEventListener('click', () => {
    /*Le saco o le añado la clase 'modal--show'*/
    modal.classList.add('modal--show');
    addNewGame();
}); 


/*Traigo el boton para cerrar el modal*/
const closeModal = document.getElementById('closeModal');

closeModal.addEventListener('click', () => {
    const preview= document.querySelector('.preview');
    preview.innerHTML= "";

    /*Le saco o le añado la clase 'modal--show'*/
    modal.classList.remove('modal--show');
});

/**********Codigo para agregar un nuevo juego**********/
const addNewGame= () => {
    /*Traigo los datos que se añaden a traves de la ventana modal*/
    const inputNameGame = document.getElementById('nombreJuego');
    const inputSubNameGame = document.getElementById('subtituloJuego');
    const inputTitleGame = document.getElementById('tituloJuego');
    const textAreaHistory = document.getElementById('historiaJuego');
    const textAreaSummary = document.getElementById('resumenJuego');

    //Creo un objeto
    const newGame = {
        id: "algo",
        name: inputNameGame.value,
        titulo: inputTitleGame.value,
        historia: textAreaHistory.value,
        resumen: textAreaSummary.value,
    };
};
