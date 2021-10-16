//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//API con el cambio del dolar
const cambioUSD ="https://cotizaciones-brou.herokuapp.com/api/currency/latest"

//costo total de los productos
function costoPorProductos(array){
    let cambioMoneda=JSON.parse(localStorage.getItem('cambioMoneda'));
    let sum=0;
    //expreso el resultado en dolares
    for(let i=0; i<array.length; i++){
        if(array[i].currency==="UYU"){
            sum += array[i].count*array[i].unitCost/cambioMoneda.rates.USD.sell;
        }else{
            sum += array[i].count*array[i].unitCost;
        }
    }
    htmlContentToAppend='';
    htmlContentToAppend=`
    <br>
    <div class="d-flex justify-content-between">
        <p>Subtotal:</p>
        <p class="text-right">${parseInt(sum)} USD</p>
    </div>
    <div class="d-flex justify-content-between">
        <p>Costo de envío:</p>
        <p class="text-right">${parseInt(sum*0.13)} USD</p>
    </div>    
    <hr>
    <p>Total:</p>
    <p class="text-right display-4">${parseInt(sum + sum*0.13)} USD</p>
    `;
    document.getElementById("products-total-cost").innerHTML+=htmlContentToAppend
}

//borrar producto
function deleteProduct(name){
    let articles=JSON.parse(localStorage.getItem('articlesCart'));
    if(articles!=null){
        for(let i=0; i<articles.length; i++){
            if(articles[i].name===name){
                articles.splice(i,1);
            }
        }
    };
    localStorage.setItem('articlesCart', JSON.stringify(articles));
    location.reload()
}
//agregar unidades de un producto al carrito
function agregarAlCarrito(currency, name, src, unitCost){
    let newArticle;
    let articles=JSON.parse(localStorage.getItem('articlesCart'));
        for(let i=0; i<articles.length; i++){
            if(articles[i].name===name){
                newArticle={
                    count:articles[i].count+1,
                    currency:currency,
                    name:name,
                    src:src,
                    unitCost: parseInt(unitCost)
                };
                articles[i]=newArticle;
            }
        };
    localStorage.setItem('articlesCart', JSON.stringify(articles))
    location.reload()
}
//quitar unidades de un producto al carrito
function quitarAlCarrito(currency, name, src, unitCost){
    let newArticle;
    let articles=JSON.parse(localStorage.getItem('articlesCart'));
        for(let i=0; i<articles.length; i++){
            if(articles[i].name===name && articles[i].count>1){
                newArticle={
                    count:articles[i].count-1,
                    currency:currency,
                    name:name,
                    src:src,
                    unitCost: parseInt(unitCost)
                };
                articles[i]=newArticle;
            }
        };
    localStorage.setItem('articlesCart', JSON.stringify(articles))
    location.reload()
}
//Mostrar los productos que esten en un array
function mostrarCarrito(array){    
    let articlesCart=JSON.parse(localStorage.getItem('articlesCart'));
    //verifico que los elementos del array no coincidan con los del local storage
    if(array[0].name!=articlesCart[0].name){
        Array.prototype.push.apply(array, articlesCart);
    }else{
        array=articlesCart
    }
    htmlContentToAppend=``;
    for(let i=0; i<array.length; i++){
        let articulo=array[i];
        htmlContentToAppend+=`
            <div class="d-flex col">
                <img src="${articulo.src}" class="col-5 h-100 p-1 img-thumbnail">
                <div class="col">
                        <div class="d-md-flex inline-block">
                            <h5 class="col-md-8 p-0">${articulo.name}</h6>
                            <div class="col justify-content-end p-0">
                                <div class="col">
                                    <label class="" for="units">Unidades:</label>
                                    <div class="d-flex justify-content-center border rounded-pill">
                                        <button class="btn d-flex m-0 rounded-circle" onclick="quitarAlCarrito('${articulo.currency}', '${articulo.name}', '${articulo.src}', '${articulo.unitCost}')">-</button>
                                        <p class="text-center m-2">${articulo.count}</p>
                                        <button class="btn d-flex m-0 rounded-circle" onclick="agregarAlCarrito('${articulo.currency}', '${articulo.name}', '${articulo.src}', '${articulo.unitCost}')">+</button>
                                    </div>
                                </div>
                            </div>                  
                        </div>
                        <div>
                            <small>Costo por unidad: ${articulo.unitCost} ${articulo.currency}</small>
                            <p class="mb-1">Precio: ${articulo.unitCost*articulo.count} ${articulo.currency}</p>
                        </div>
                            <button class="btn btn-secondary d-flex mr-0" onclick="deleteProduct('${articulo.name}')">Borrar producto</button>
                        </div>
                </div>
            <hr>
        `
    };
    document.getElementById("products-in-cart").innerHTML += htmlContentToAppend;
    localStorage.setItem('articlesCart', JSON.stringify(array))
    costoPorProductos(array)
}
function elegirPago(){
    let htmlContentToAppend="";
    htmlContentToAppend=`
    <div class="form-check">
        <label class="form-check-label mx-3">
            <input type="radio" class="form-check-input" name="optradio" id="visa"><i class="fab fa-cc-visa fa-2x"></i>
        </label>
        <label class="form-check-label mx-3">
            <input type="radio" class="form-check-input" name="optradio" id="paypal"><i class="fab fa-cc-paypal fa-2x"></i>
        </label>
        <label class="form-check-label mx-3">
            <input type="radio" class="form-check-input" name="optradio" id="mastercard"><i class="fab fa-cc-mastercard fa-2x"></i>
        </label>
        <label class="form-check-label mx-3">
            <input type="radio" class="form-check-input" name="optradio" id="amex"><i class="fab fa-cc-amex fa-2x"></i>
        </label>
    </div>

    `;
    document.getElementById("tipoPago").innerHTML+=htmlContentToAppend;
}

function elegirEnvio(){
    let htmlContentToAppend="";
    htmlContentToAppend=`
    <div class="btn-group btn-block">
        <button type="button" class="btn btn-secondary" onclick="mostrarRetiro()">Retiro en local</button>
        <button type="button" class="btn btn-secondary" onclick="mostrarEnvio()">Envio a domicilio</button>
    </div>
    <div id="datosEntrega"></div>
    `
    document.getElementById("tipoEnvio").innerHTML += htmlContentToAppend;
}
 function mostrarRetiro(){
     let htmlContentToAppend="";
     htmlContentToAppend=`
     <br>
     <form action="">
        <p>Dirección: Avd. Tomkinson 3452</p>
        <div class="form-group">
            <label for="date-time">Elija fecha y hora de retiro:</label>
            <input class="form-control" type="datetime-local" name="date-time" id="date-time">
        </div>
    </form>
     `;
     document.getElementById("datosEntrega").innerHTML = htmlContentToAppend;
 }

 function mostrarEnvio(){
    let htmlContentToAppend="";
    htmlContentToAppend=`
    <br>
    <form action="">
        <div class="form-group">
            <label for="country">País:</label>
            <select class="form-control" id="country">
                <option>Uruguay</option>
                <option>Argentina</option>
                <option>Chile</option>
            </select>
        </div>
        <div class="form-group">
            <label for="address">Direccion:</label>
            <input class="form-control" type="text" name="address" id="address">
        </div>
        <div class="form-check">
        <label class="form-check-label">
            <input type="radio" class="form-check-input" name="optradio" id="premium"  checked>Premium (2-5 días)
        </label>
        </div>
        <div class="form-check">
        <label class="form-check-label">
            <input type="radio" class="form-check-input" name="optradio" id="express">Express (5-8 días)
        </label>
        </div>
        <div class="form-check">
        <label class="form-check-label">
            <input type="radio" class="form-check-input" name="optradio" id="standar">Standar (12-15 días)
        </label>
    </div>

        <div class="form-group">
           <label for="date-time">Fecha en que desea recibir el pedido:</label>
           <input class="form-control" type="datetime-local" name="date-time" id="date-time">
       </div>
   </form>
    `;
    document.getElementById("datosEntrega").innerHTML = htmlContentToAppend;

 }



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(cambioUSD).then(function(resultObj){
        if(resultObj.status==="ok"){
            localStorage.setItem('cambioMoneda', JSON.stringify(resultObj.data))
        }
        getJSONData(CART_INFO_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                mostrarCarrito(resultObj.data.articles);
            };
        });
        elegirEnvio();
        elegirPago()
    })
});



