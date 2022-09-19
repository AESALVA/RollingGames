// ---------------------------------------------------------------------------------------------------------
/*********Codigo para cargar juegos del localStorage a la tabla**********/
let MOCKED_DATA;

document.addEventListener('DOMContentLoaded', () => updateTable());

const updateTable = () => {
    const tableGames = document.getElementById('datatable-tbody');

    //Dejo vacio la tabla y vuelvo a cargar
    tableGames.innerHTML= "";

    MOCKED_DATA= JSON.parse(localStorage.getItem('MOCKED_DATA'));

    //Me traigo el juego destacado
    const featuredGame= JSON.parse(localStorage.getItem("juegoDestacado"));

    MOCKED_DATA.forEach(game => {
        //Pinto de un color el icono destacado para el juego destacado
        let colorFeatured = "highlight";
        if(game.id === featuredGame){
            colorFeatured= "highlight-color";
        }

        //Agrego el juego a la tabla
        let newRow = document.createElement('tr');
        newRow.innerHTML= `<td class="title-game">${game.name}</td>
        <td>${game.id}</td>
        <td>${game.name}</td>
        <td>Falta agregar en el modal</td>
        <td>${game.resumen}</td>
        <td class="table-checkbox">
          <input type="checkbox" name="" id="" checked/>
        </td>
        <td>
          <span class="options">
            <span class="delete" onclick="deleteGame('${game.id}')"
              ><i class="fa-solid fa-trash-can"></i
            ></span>
            <span class="edit" onclick="editGame('${game.id}')"
              ><i class="fa-solid fa-pen-to-square"></i
            ></span>
            <span class=${colorFeatured} onclick= "featuredGame('${game.id}')"
              ><i class="fa-solid fa-star"></i
            ></span>
          </span>
        </td>
      </tr>`;

      tableGames.appendChild(newRow);
    });
};

// ---------------------------------------------------------------------------------------------------------
/*********Codigo para la carga de la imagen historia**********/
const buttonImages = document.querySelector('#selectedFiles');
const inputImages = document.querySelector('#input-files');
let filesImages= []; //Array que almacena los archivos

buttonImages.addEventListener('click', (e) => {
    //Llamo al 'input-file'
    inputImages.click();
    console.log("click");
});

inputImages.addEventListener('change', (e) => {
    if(filesImages.length == 0) {
        filesImages= Array.from(inputImages.files);
    } else {
        for(let i= 0; i< inputImages.files.length; i++) {
            filesImages.push(inputImages.files[i]);
        }
    }
    //Bloqueo el boton para que no se pueda agregar mas
    if(filesImages.length == 10) {
        buttonImages.disabled= true;
    }

    console.log(filesImages);
    showFiles(filesImages);
});


function showFiles(files) {
    //Caso cuando se arrastra un sólo archivo
    if(files === undefined) {
        processFile(files);
    } else {
        deletePreviewFiles();
        for(const file of files) {
            processFile(file);
        }
    }
}

function processFile(file) {
    const docType = file.type;
    const validExtensionsImages= ['image/jpeg','image/jpg','image/png','image/gif', 'image/webp'];

    if(validExtensionsImages.includes(docType)) {
        //El archivo seleccionado es valido
        loadImagesInPreview(file);
    } else {
        //El archivo seleccionado no es valido
        let index= filesImages.indexOf(file);
        filesImages.splice(index, 1);
        alert("No es un archivo valido");
    }
}

function loadImagesInPreview(file) {
    const fileReader = new FileReader();
    const id = `file-${Math.random().toString(32).substring(7)}`;

    fileReader.addEventListener('load', (e) => {
        const fileUrl = fileReader.result; //Url local

        const image = `
            <div id="${id}" class= "file-container">
                <img src="${fileUrl}" alt="${file.name}" width= "50">
                <div class="status">
                    <span>${file.name}</span>
                    <span class="iconCross" onclick= "deleteImage('${file.name}')"><i class="fa-solid fa-xmark"></i><span>    
                </div>
            </div>
        `;
        const preview= document.querySelector('.previewImages').innerHTML;
        document.querySelector('.previewImages').innerHTML = preview + image;
    });

    fileReader.readAsDataURL(file);
}

// ---------------------------------------------------------------------------------------------------------
/**********Codigo para eliminar el archivo ingresado**********/

const deleteImage= (fileName) => {
    let flagDeleteImage= false;

    //Si al momento de borra el juego tiene 10 imagenes
    if(filesImages.length == 10) {
        buttonImages.disabled= false;
    }

    for(let i= 0; i < filesImages.length; i++) {
        console.log(filesImages);
        if(filesImages[i].name === fileName) {
            filesImages.splice(i, 1);
            flagDeleteImage= true;
            break;
        }
    }

    if(flagDeleteImage) {
        console.log(`Se elimino el archivo ${fileName}`);
    }

    //Elimino todas las imagenes que estan en el 'preview'
    deletePreviewFiles();

    //Recargo las imagenes en el preview
    uploadImages();
}

const uploadImages= () => {
    for(let i= 0; i < filesImages.length; i++) {
        loadImagesInPreview(filesImages[i]);
    }
}

const deletePreviewFiles= () => {
    const preview= document.querySelector('.previewImages');
    preview.innerHTML= "";

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
    deletePreviewFiles();

    cleanInputs([inputId, inputNameGame, inputSubNameGame,inputTitleGame, textAreaHistory, textAreaSummary]);
    modifiedOrAddedGame= false;

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
const previewImages= document.querySelector('.previewImages');

let addGame = false;

addNewGame.addEventListener('click',  (e) => {
    e.preventDefault();
    
    if(!validationInput([inputId, inputNameGame, inputSubNameGame,inputTitleGame, textAreaHistory, textAreaSummary, previewImages])){
        //Creo un objeto
        const newGame = {
            id: inputId.value,
            name: inputNameGame.value,
            subtitulo: inputSubNameGame.value,
            titulo: inputTitleGame.value,
            historia: textAreaHistory.value,
            resumen: textAreaSummary.value,
            img_historia: "",
            img_muestra: [],
            imagenes: [],
            animation: [],
            disponible: true
        };

        if(modifiedGame) {
            databaseGames(newGame, 'update', modifiedGameName);
        }else {
            databaseGames(newGame, 'insert');
        }
        //Muestro el juego por consola
        console.log(newGame);
        addGame= true;

        //Muestro ventana de exito
        showAlert('success', inputTitleGame.value);
    }
    
});

//Valido los datos ingresado por los inputs
const validationInput = (inputs) =>{
    let flag= false;
    let nameLabel= "";

    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].className === 'previewImages' && inputs[i].childNodes.length === 0){
            nameLabel= "Imaganes de juego"
            flag= true;
            break;
        }else if(inputs[i].value === "") {
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
}

// ---------------------------------------------------------------------------------------------------------
/**********Codigo para eliminar un juego**********/
const deleteGame= (id) => {
    console.log(`se elimino el juego ${id}`);
    const remove= searchGame(id);
    databaseGames(remove, 'delete');
};

// ---------------------------------------------------------------------------------------------------------
/*********Codigo para el boton modificar juego**********/
let modifiedGame= false;
let modifiedGameName= "";

const editGame = (idGame) =>{

    modifiedGame= true;
    modifiedGameName= idGame;
    loadGameModal(idGame);

    modal.classList.add('modal--show');

    console.log(`Se edita el videojuego ${idGame}`);
}

//Esta funcion carga los datos del juego seleccionado en la ventana modal
const loadGameModal = (idGame) => {
    let game= searchGame(idGame);

    inputId.value= game.id;
    inputNameGame.value = game.name;
    inputTitleGame.value = game.titulo;
    inputSubNameGame.value= game.subtitulo;
    textAreaHistory.value = game.historia;
    textAreaSummary.value = game.resumen;

    let count= 1;

    //Cargo la imagen historia
    loadImages(count, game.img_historia, game.name)

    //Cargo las imagenes de muestra
    for(let i= 0; i < game.img_muestra.length; i++) {
        count++;
        loadImages(count, game.img_muestra[i], game.name);
    }

    //Cargo las imagenes 
    for(let i= 0; i < game.imagenes.length; i++) {
        count++;
        loadImages(count, game.imagenes[i], game.name);
    }

    //Cargo las animation
    for(let i= 0; i < game.animation.length; i++) {
        count++;
        loadImages(count, game.animation[i], game.name);
    }
};

const loadImages= (id, urlImage, nameImage) => {
    const image = `
            <div id="${id}" class= "file-container">
                <img src="${urlImage}" alt="${nameImage}" width= "50">
                <div class="status">
                    <span>${nameImage}</span>
                    <span class="iconCross" onclick= "deleteImage('${nameImage}')"><i class="fa-solid fa-xmark"></i><span>    
                </div>
            </div>
        `;
        const preview= document.querySelector('.previewImages').innerHTML;
        document.querySelector('.previewImages').innerHTML = preview + image;
}

const searchGame= (idGame) => {
    let game= "";

    for(let i= 0; i < MOCKED_DATA.length; i++) {
        if(MOCKED_DATA[i].id === idGame){
            game= MOCKED_DATA[i];
            break; 
        }
    }

    return game;
};

// ---------------------------------------------------------------------------------------------------------
/*********Codigo para el juego destacado**********/
const featuredGame= (idGame) => {

    moveGames(idGame);

    //Guardo registro del nuevo juego destacado en el localStorage
    localStorage.setItem("juegoDestacado", JSON.stringify(idGame));
}
const moveGames= (idGame) => {
    let firstGame= MOCKED_DATA[0];
    let newCurrentFeatured= searchGame(idGame); //nuevo

    let indexIdGame= MOCKED_DATA.indexOf(newCurrentFeatured); // indice nuevo

    //Hago el swap
    MOCKED_DATA[0] = newCurrentFeatured;
    MOCKED_DATA[indexIdGame]= firstGame;

    databaseGames(null, 'update');
};

// ---------------------------------------------------------------------------------------------------------
/**********Acciones sobre el localStorage**********/
const databaseGames= (game, action, modifiedGameName= "") => {

    if(action === "insert") {
        //Agrego el juego
        MOCKED_DATA.push(game);
    } else if (action === "delete") {
        const index= MOCKED_DATA.indexOf(game);
        MOCKED_DATA.splice(index, 1);
    }else if(action === "update") {
        const nowGame= searchGame(modifiedGameName);
        const indice= MOCKED_DATA.indexOf(nowGame);
        MOCKED_DATA[indice]= game;
    }
    
    //Cualquiera que sea la accion lo guardo en el localstorage
    localStorage.setItem('MOCKED_DATA', JSON.stringify(MOCKED_DATA));

    updateTable();

    console.log(MOCKED_DATA);
};