//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//JSONs con cada producto y sus comentarios "use como id el nombre"
const PRODUCT_INFO_URL_LIST =[
    {name: "Chevrolet Onix Joy",
    link:"https://rodrigo2000m.github.io/proyectoJAP/js/API/Chevrolet.json",
    linkToComment:"https://rodrigo2000m.github.io/proyectoJAP/js/API/ChevroletComments.json"},
    {name: "Fiat Way",
    link:"https://rodrigo2000m.github.io/proyectoJAP/js/API/Fiat.json",
    linkToComment:"https://rodrigo2000m.github.io/proyectoJAP/js/API/FiatComments.json"},
    {name: "Peugeot 208",
    link:"https://rodrigo2000m.github.io/proyectoJAP/js/API/Peugeot.json",
    linkToComment:"https://rodrigo2000m.github.io/proyectoJAP/js/API/PeugeotComments.json"},
    {name: "Suzuki Celerio",
    link:"https://rodrigo2000m.github.io/proyectoJAP/js/API/Suzuki.json",
    linkToComment:"https://rodrigo2000m.github.io/proyectoJAP/js/API/SuzukiComments.json"}
  ];
  let PRODUCT_INFO_URL_NEW="";
  let PRODUCT_INFO_COMMENTS_URL_NEW="";
  function elegirProduct(){
    let nameProduct=JSON.parse(localStorage.getItem('nameProduct'));
    for(let i=0; i<PRODUCT_INFO_URL_LIST.length;i++){
        if(PRODUCT_INFO_URL_LIST[i].name===nameProduct){
            PRODUCT_INFO_URL_NEW+=PRODUCT_INFO_URL_LIST[i].link;
            PRODUCT_INFO_COMMENTS_URL_NEW+=PRODUCT_INFO_URL_LIST[i].linkToComment;
        }
    }
  };
  elegirProduct();
  

//esta funcion agrega el contenido del carusel, recorre un array con imagenes
function createCarusel(array) {
    contenidoIndicador = "";
    agregarImagenes = "";
    for (let i = 0; i < array.length; i++) {
        if (i === 0) {
            contenidoIndicador += `
                <li data-target="#demo" data-slide-to="${i}" class="active"></li>
            `;
            agregarImagenes += `
            <div class="carousel-item active">
                <img src="${array[i]}" alt="" class="w-100">
            </div>
            `
        } else {
            contenidoIndicador += `
                <li data-target="#demo" data-slide-to="${i}"></li>
        `;
            agregarImagenes += `
            <div class="carousel-item">
                <img src="${array[i]}" alt="" class="w-100">
            </div>
        `}
    };
    document.getElementById("indicadorLista").innerHTML += contenidoIndicador;
    document.getElementById("slideshow").innerHTML += agregarImagenes;
}

//creo la estructura con los productos
function cargarInfoProducto(product) {
    let htmlContentToAppend = "";
    htmlContentToAppend += `
                <div class="row">
                    <div class="col-8">

                        <!--Estructura del carrusel-->
                        <div id="demo" class="carousel slide" data-ride="carousel border">
                            <!--Lista de indicadores-->
                            <ul id="indicadorLista" class="carousel-indicators"></ul>
                            
                            <!-- The slideshow -->
                            <div id="slideshow" class="carousel-inner"></div>
                            
                            <!-- Left and right controls -->
                            <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                <span class="carousel-control-prev-icon"></span>
                            </a>
                            <a class="carousel-control-next" href="#demo" data-slide="next">
                                <span class="carousel-control-next-icon"></span>
                            </a>
                        </div>  
                    </div>

                    <div class="col">
                        <div class="border rounded p-3">
                            <div class="w-100 d-flex justify-content-between my-2 p-0">
                                <small class="text-muted">${product.soldCount} artículos vendidos</small>
                                <p class="badge badge-info ml-auto">${product.category}</p><br>
                            </div>
                            <div class="d-flex w-100 justify-content-between my-2">
                                <h3 class="mb-1">${product.name}</h3>
                            </div>
                            <p class="mb-1 text-right display-4">${product.cost} ${product.currency}</p>
                            
                            <br><br><br>
                            <button class="btn btn-primary btn-block my-2">Comprar ahora</button>
                            <button class="btn btn-primary btn-block my-2">Agregar al carrito</button>
                            <br>                      
                        </div>

                    </div>
                </div>

                <div class="row">
                    <div class="col-8">
                        <div class="py-3">
                            <h4>Descripcion del producto</h4>
                            <p class="mb-1 text-justify">${product.description}</p>
                        </div>
                        <div class="py-2" id="comentarios"></div>
                    </div>
                    <div class="col">
                        <div class="border rounded p-3 my-3">
                            <h4>Productos relacionados</h4>
                            <p class="mb-1 text-justify">${product.relatedProducts}</p>
                        </div>     
                    </div> 
                </div>

        `;
    document.getElementById("productContainer").innerHTML += htmlContentToAppend;
    createCarusel(product.images);
}

//Funcion que asigna las cantidad de estrellas de acuerdo a un numero de 1 a 5
function cargarStars(number) {
    aux = "";
    for (let i = 1; i <= number; i++) {
        aux += `
        <span class="fa fa-star checked"></span>
        `
    };
    for (let i = number + 1; i <= 5; i++) {
        aux += `
        <span class="fa fa-star"></span>
        `
    };
    return aux;
};

//funcion que me da la hora en el formato que quiero
//la funcion no retorna los datos correctamente
/*function fechaAndHora() {
    let fechaActual="";
    var d = new Date();
    fechaActual=
    d.getFullYear()+"-"
    +d.getMonth()+"-"
    +d.getDay()+" "
    +d.getHours()+":"
    +d.getMinutes()+":"
    +d.getSeconds();
    return fechaActual;
  }*/

//cargo los comentarios usando la funcion auxiliar cargarStars
function cargarComentarios(array) {
    //lo que esta en el localStorage como comment se agrega al array
    comment=JSON.parse(localStorage.getItem('comment'));
    if(comment!=null){
        for(let i=0;i<comment.length;i++){
            array.unshift(comment[i])
        }
    }
    //encabezado de comentarios
    let htmlContentToAppend = `
        <div class="d-flex justify-content-between">
            <h4>Comentarios</h4>
            <small class="text-muted">${array.length} comentarios</small> 
        </div>
        <div class="d-flex justify-content-between">
            <p class="py-1 my-1">Calificación: ${promedio(array)}</p>
        </div>

        <!--espacio para agregar nuevo comentario-->
        <form action="">
            <div class="border rounded p-3 my-2">
                <div>
                    <span class="fa fa-star" id="1" onclick="checkedStars(this)"></span>
                    <span class="fa fa-star" id="2" onclick="checkedStars(this)"></span>
                    <span class="fa fa-star" id="3" onclick="checkedStars(this)"></span>
                    <span class="fa fa-star" id="4" onclick="checkedStars(this)"></span>
                    <span class="fa fa-star" id="5" onclick="checkedStars(this)"></span>
                </div>
                <div class="d-flex justify-content-between w-100 my-2">
                    <h6><i class="fas fa-user border p-2 m-2 rounded-circle bg-dark text-white"></i>${usuario.name}</h6>
                </div>
                <input id="description" name="description" type="text" placeholder="Escriba un comentario del producto" class="form-control my-2">
                <button class="btn btn-primary" id="calificar" onclick="guardarComentario(parseInt(countStars),description.value, usuario.name, new Date())" type="submit">Calificar</button>   
            </div>
        </form>
    `;

    //agrego comentarios existentes en el json
    for (let i = 0; i < array.length; i++) {
        let comentario = array[i];
        htmlContentToAppend += `
        <div class="border rounded p-3 my-2">
        ${cargarStars(comentario.score)}

            <div class="d-flex justify-content-between w-100 my-2">
                <h6><i class="fas fa-user border p-2 m-2 rounded-circle bg-dark text-white"></i>`+ " " + comentario.user + `</h6>
                <p>`+ comentario.dateTime + `</p> 
            </div>
            <p class="p-2 m-2">`+ comentario.description + `</p>   
        </div>
        `
    };
    document.getElementById("comentarios").innerHTML += htmlContentToAppend;
};

//checkear las estrellas
let countStars;
function checkedStars(elemento){
    countStars=elemento.id;
    for(let i=1;i<=5;i++){
        if(i<=countStars){
            document.getElementById(i).classList.add("checked"); 
        }else{
            document.getElementById(i).classList.remove("checked"); 
        }
    };
}



function guardarComentario(score, description, user, date) {
    let comment=[];
    Array.prototype.push.apply(comment, JSON.parse(localStorage.getItem('comment')));
    let newComment = {
        score: score,
        description: description,
        user: user,
        dateTime: date
    };
    comment.push(newComment);
    //comment.push(newComment);
    localStorage.setItem('comment', JSON.stringify(comment));
};

//Hace el promedio de las calificaciones
function promedio(array) {
    sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += parseInt(array[i].score)
    };
    score = parseInt(sum / array.length);
    return cargarStars(score);
    //no se agrego para que promedie los comentarios nuevos
}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL_NEW).then(function (resultObj) {
        if (resultObj.status === "ok") {
            cargarInfoProducto(resultObj.data)
        }
        getJSONData(PRODUCT_INFO_COMMENTS_URL_NEW).then(function (resultObj) {
            if (resultObj.status === "ok") {
                cargarComentarios(resultObj.data);
            }
        })
    });
});


