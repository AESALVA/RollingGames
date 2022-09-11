
const DATA_REMARKABLE = [
  {
    img: "/RollingGames/PaginaInicio/inicio/imagenes/spiderman.jpg",
    id: "spiderman",
    name: "Marvel's SpiderMan",
    resumen:
      "Desde el parkour hasta las interacciones según el entorno, pasando por el nuevo sistema de combate y una acción espectacular, jugarás con Spider-Man como nunca antes has hecho hasta ahora.",
  },
  {
    img: "/RollingGames/PaginaInicio/inicio/imagenes/diablo3.webp",
    id: "diablo",
    name: "Diablo III & Reaper of Souls",
    resumen:
      "Al arcángel Tyrael se lo da por muerto, y la humanidad está sola para afrontar las consecuencias de sus actos Los fragmentos de la Piedra del Mundo aún dotados de un inmenso poder, contaminan la tierra y los esbirros de Diablo esperan poder controlar ese poder para que el Señor del Terror pueda regresar",
  },
  {
    img: "/RollingGames/PaginaInicio/inicio/imagenes/hearthstone.jpg",
    id: "hearthstone",
    name: "HearthStone",
    resumen:
      "Todos pueden jugar Hearthstone. Practica tus habilidades en partidas casuales, sube de rango en el modo clasificado, disfruta de un giro divertido en las Grescas de la taberna, pon a prueba tu suerte en la Arena, juega aventuras en solitario contra adversarios malignos e ingeniosos controlados por la computadora y mucho, mucho más",
  },
  {
    img: "/RollingGames/PaginaInicio/inicio/imagenes/hotpursuit.jpg",
    id: "nfs",
    name: "Need For Speed Hot Persuit",
    resumen:
      "Need for Speed™ Hot Pursuit Remastered ofrece un juego de carreras atemporal actualizado para la generación de hardware actual con gráficos mejorados.",
  },
  {
    img: "/RollingGames/PaginaInicio/inicio/imagenes/Mortal-Kombat-X.webp",
    id: "mortalkombat",
    name: "Mortal Kombat X",
    resumen:
      "Tras la desaparición de Shao Kahn, el dios caído Shinnok ataca la Tierra con su ejército de criaturas del Inframundo, incluidos los guerreros del Reino de la Tierra que fallecieron en los sucesos de Mortal Kombat 9.",
  },
  {
    img: "/RollingGames/PaginaInicio/inicio/imagenes/robots.jpg",
    id: "overwatch",
    name: "OverWatch",
    resumen:
      "Cuando entras a una partida de Overwatch, debes elegir un héroe con el cual jugar. Tal vez te atraiga un simio genéticamente alterado de la luna. Tal vez prefieras a una luchadora por la libertad que viaja en el tiempo. ¿O es más tu estilo un DJ que lleva su música al campo de batalla? No importa quién quieras ser, hay un héroe de Overwatch para ti.",
  },
  {
    img: "/RollingGames/PaginaInicio/inicio/imagenes/speedstorm.webp",
    id: "speedstorm",
    name: "Speed Storm",
    resumen:
      "La acción nunca se ralentiza gracias al nuevo contenido de temporada siempre a la vuelta de la esquina. Nuevos corredores, nuevas pistas y coleccionables aparecerán regularmente.",
  },
  {
    img: "/RollingGames/PaginaInicio/inicio/imagenes/warcraft.jpg",
    id: "warcraft",
    name: "World Of WarCraft",
    resumen:
      "Después de que el rey de Ventormenta, Varian Wrynn, desapareciera misteriosamente, el alto señor Bolvar Fordragón sirvió como regente; sin embargo, su trabajo se vio entorpecido por las manipulaciones y el control mental del dragón negro Onyxia, quien gobernaba disfrazado como una humana perteneciente a la nobleza. Mientras los héroes investigaban las manipulaciones de Onyxia, antiguos enemigos aterrizaron en territorios situados por doquier para amenazar por igual a la Horda y la Alianza. ",
  },
];
const conteinerRemarkable = document.getElementById("seccion-destacado");

function createRemarkable(data) {
  const remarkable = document.createElement("div");
  remarkable.innerHTML = ` <div id="card-destacado" class="card mb-0">
				<div class="row g-0">
				  <div class="col-md-8">
					<img src="${data.img}" id="img-destacado" class="img-fluid" alt="SPIDERMAN">
				  </div>
				  <div class="col-md-4">
					<div class="card-body">
					  <h5 class="card-title">${data.name}</h5>
					  <p class="card-text text-muted">YA DISPONIBLE</p>
					  <p class="card-text">${data.resumen}</p>
					  <div class="fondo"><a id="ver-mas-btn" class="button_verMas" href="/RollingGames/detalleJuego.html" target:"_parent" onclick="createPage(DATA_GAMES, '${data.id}')" role="button">Ver más</a></div>
					</div>
				  </div>
				</div>
			</div>`;
  localStorage.setItem("id", JSON.stringify(data.id));
  conteinerRemarkable.appendChild(remarkable);
}

createRemarkable(DATA_REMARKABLE[0]);

const principal = document.getElementById('principal');
const categoria = document.getElementById('categoria');
const estrategia = document.getElementById('estrategia');
const accion = document.getElementById('accion');
const aventura = document.getElementById('aventura');
const otros = document.getElementById('otros')


function createCardsTwo(data) {
  data.map((d)=>{
    const cards = document.createElement('div');
    const button = document.createElement('a');
    cards.classList="card_perfil";
    cards.innerHTML = `
    <div class="img">
      <img
        src="${d.img}"
        alt="img_juego"
      />
    </div>
    <p>${d.name}</p>
  </div>`;
  button.innerHTML=`<a class="button_verMas" target="_parent" href="/RollingGames/detalleJuego.html"> VER MAS </a>`;
  button.addEventListener("click",()=> localStorage.setItem("id",JSON.stringify(d.id)));
  cards.appendChild(button);
  categoria.appendChild(cards);
  })
  
}

function createCardsThree(data,id) {
  data.map((d)=>{
    const cards = document.createElement('div');
    const button = document.createElement('a');
    cards.classList="card_perfil";
    cards.innerHTML = `
    <div class="img">
      <img
        src="${d.img}"
        alt="img_juego"
      />
    </div>
    <p>${d.name}</p>
  </div>`;
  button.innerHTML=`<a class="button_verMas" target="_parent" href="/RollingGames/detalleJuego.html"> VER MAS </a>`;
  button.addEventListener("click",()=> localStorage.setItem("id",JSON.stringify(d.id)));
  cards.appendChild(button);
  if (id===estrategia) {
    estrategia.appendChild(cards);
  }else if (id===accion){
    accion.appendChild(cards);
  }else if (id===aventura){
    aventura.appendChild(cards);
  }else{
    otros.appendChild(cards);
  }
  })
  
}




createCardsTwo(DATA_REMARKABLE);
createCardsThree(DATA_REMARKABLE,estrategia);
createCardsThree(DATA_REMARKABLE,accion);
createCardsThree(DATA_REMARKABLE,aventura)
createCardsThree(DATA_REMARKABLE,otros);