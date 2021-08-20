//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


//Creo una funcion que devuelva los productos
let productsArray=[]
function showProducts(array){
    let htmlContentToAppend = "";
    for(let i=0; i<array.length;i++){
        let products=array[i];
        htmlContentToAppend +=`
        <a href="products-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ products.name +`</h4>
                            <small class="text-muted">` + products.soldCount + ` artículos vendidos</small>
                        </div>
                        <p class="mb-1">` + products.description + `</p>
                        <p class="mb-1">` + products.cost+" " +products.currency + `</p>
                    </div>
                </div>
            </a>
        `;
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    };
    
};



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data;

            showProducts(productsArray);
        };
    
    })
});

