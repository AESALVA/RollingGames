const DATA_GAMES= [
    {
        id:"diablo",
        name:"Diablo III & Reaper of Souls",
        titulo:"RESPONDE LA LLAMADA A LA BATALLA",
        historia:"Lucha contra males ancestrales y desvela la historia de los sucesos transcurridos entre Diablo II y Diablo III en este nuevo RPG de acción multijugador masivo en línea desarrollado para móvil pero con beta abierta también disponible próximamente en PC",
        resumen:"   Al arcángel Tyrael se lo da por muerto, y la humanidad está sola para afrontar las consecuencias de sus actos Los fragmentos de la Piedra del Mundo aún dotados de un inmenso poder, contaminan la tierra y los esbirros de Diablo esperan poder controlar ese poder para que el Señor del Terror pueda regresar",
        subtitulo:"MATA DEMONIOS DONDEQUIERA QUE ESTÉS",
        img_historia:"/RollingGames/AssetData/Diablo3/bg_historia/249110.jpg",
        img_muestra:[
            "/RollingGames/AssetData/Diablo3/Carrousel/diablo-3-reaper-of-souls-ultimate-evil-edition-rev_z2rq.1200.webp",
            "/RollingGames/AssetData/Diablo3/Carrousel/Diablo-III.webp",
            "/RollingGames/AssetData/Diablo3/Carrousel/diablo3.webp",
        ],
        imagenes:[
            "/RollingGames/AssetData/Diablo3/trailer/D3_LH_107_072.jpg",
            "/RollingGames/AssetData/Diablo3/trailer/diablo-3-patch-2-1-out-this-week-1409044556927.jpg",
            "/RollingGames/AssetData/Diablo3/trailer/maxresdefault.jpg",
        ],
        animation:[
            "/RollingGames/AssetData/Diablo3/trailer/diablo1.gif",
            "/RollingGames/AssetData/Diablo3/trailer/diablo2.gif",
            "/RollingGames/AssetData/Diablo3/trailer/diablo3.gif",
        ]
    }
];


const conteiner = document.getElementById('conteiner');


function createPage(data, id) {
    data.map(d=>{
        const index = DATA_GAMES.indexOf(d);
        if (id === DATA_GAMES[index].id) {
        const section = document.createElement('section');
        section.innerHTML = `<div
        id="carouselExampleControlsNoTouching"
        class="carousel slide px-5"
        data-bs-touch="false"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="${d.img_muestra[0]}"
              class="d-block w-100"
              alt="img_juego_1"
            />
          </div>
          <div class="carousel-item">
            <img
              src="${d.img_muestra[1]}"
              class="d-block w-100"
              alt="img_juego_2"
            />
          </div>
          <div class="carousel-item">
            <img
              src="${d.img_muestra[2]}"
              class="d-block w-100"
              alt="img_juego_3"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="prev"
        >
          <span
            class="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="next"
        >
          <span
            class="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>`;
        conteiner.appendChild(section);
        const section2 = document.createElement('section');
        section2.innerHTML = `<h1 class="juego_titulo p-5">${d.titulo}</h1>
        <article class="historia">
          <img
            class="bg_img_historia"
            src="${d.img_historia}"
            alt="img_historia"
          />
          <p class="texto_historia">
            ${d.historia}
          </p>
        </article>`;
        conteiner.appendChild(section2);
        const section3 = document.createElement('section');
        section3.innerHTML = `  <p class="resumen_juegp">
        ${d.resumen}
      </p>
      <h2 class="juego_titulo p-5">${d.subtitulo}</h2>
      <div class="conteiner_trailer m-0 row justify-content-center">
        <img
          class="img_trailer m-5 col-6"
          src="${d.imagenes[0]}"
        />
        <img
          class="my-5 col-6 img_gif position-absolute top-200 start-50 translate-middle-x"
          src="${d.animation[0]}"
          alt="imgDiablo1"
        />
      </div>
      <div class="conteiner_trailer m-0 row justify-content-center">
        <img
          class="img_trailer m-5 col-6"
          src="${d.imagenes[1]}"
          alt="trailer2"
        />
        <img
          class="my-5 col-6 img_gif position-absolute top-200 start-50 translate-middle-x"
          src="${d.animation[1]}"
          alt="imgDiablo2"
        />
      </div>
      <div class="conteiner_trailer m-0 row justify-content-center">
        <img
          class="img_trailer m-5 col-6"
          src="${d.imagenes[2]}"
          alt="trailer3"
        />
        <img
          class="my-5 col-6 img_gif position-absolute top-200 start-50 translate-middle-x"
          src="${d.animation[2]}"
          alt="imgDiablo3"
        />
      </div>`;

      conteiner.appendChild(section3);
        }
        document.title = DATA_GAMES[index].name;
    });
}

createPage(DATA_GAMES,"diablo");




