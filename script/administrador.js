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
          <input type="checkbox" name="" id="" />
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
    const preview= document.querySelector('.preview');
    preview.innerHTML= "";

    if(modifiedOrAddedGame) {
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

        databaseGames(newGame, 'insert');

        //Agrego el juego a la tabla
        let newRow = document.createElement('tr');
        newRow.innerHTML= `<td class="title-game">${newGame.name}</td>
        <td>${newGame.id}</td>
        <td>${newGame.name}</td>
        <td>Falta agregar en el modal</td>
        <td>${newGame.resumen}</td>
        <td class="table-checkbox">
          <input type="checkbox" name="" id="" />
        </td>
        <td>
          <span class="options">
            <span class="delete" onclick="deleteGame('${newGame.id}')"
              ><i class="fa-solid fa-trash-can"></i
            ></span>
            <span class="edit" onclick="editGame('${newGame.id}')"
              ><i class="fa-solid fa-pen-to-square"></i
            ></span>
            <span class="highlight" onclick= "featuredGame('${newGame.id}')"
              ><i class="fa-solid fa-star"></i
            ></span>
          </span>
        </td>
      </tr>`;

      const tableGames = document.getElementById('datatable-tbody');
      tableGames.appendChild(newRow);
    
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
const editGame = (idGame) =>{

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
    textAreaHistory.value = game.historia;
    textAreaSummary.value = game.resumen;
};

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
    //Me guardo el nombre del actual juego destacado
    // let idFeatured= JSON.parse(localStorage.getItem("juegoDestacado"));
    // let currentFeatured= searchGame(idFeatured); //actual
    let firstGame= MOCKED_DATA[0];
    let newCurrentFeatured= searchGame(idGame); //nuevo

    // let indexIdFeatured= MOCKED_DATA.indexOf(currentFeatured); // indice actual
    let indexIdGame= MOCKED_DATA.indexOf(newCurrentFeatured); // indice nuevo

    //Hago el swap
    MOCKED_DATA[0] = newCurrentFeatured;
    MOCKED_DATA[indexIdGame]= firstGame;

    databaseGames(null, 'update');
};

// ---------------------------------------------------------------------------------------------------------
/**********Acciones sobre el localStorage**********/
const databaseGames= (game, action) => {

    if(action === "insert") {
        //Agrego el juego
        MOCKED_DATA.push(game);
    } else if (action === "delete") {
        const index= MOCKED_DATA.indexOf(game);
        MOCKED_DATA.splice(index, 1);
    }else if(action === "update") {

    }
    
    //Cualquiera que sea la accion lo guardo en el localstorage
    localStorage.setItem('MOCKED_DATA', JSON.stringify(MOCKED_DATA));

    updateTable();

    console.log(MOCKED_DATA);
};