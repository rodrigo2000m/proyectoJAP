//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


//Entrega1: Creo una funcion que devuelva los productos
let productsArray = []
function showProducts(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let products = array[i];
        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))) {
            let filtro = document.getElementById("searchInputFilter").value.toUpperCase();
            if (products.name.toUpperCase().indexOf(filtro) != -1 || products.description.toUpperCase().indexOf(filtro) != -1) {
                htmlContentToAppend += `
                <div class="col-md-4 col-sm-6 p-2">
                    <a onclick="goToProduct('${products.name}')" class="p-2 list-group-item list-group-item-action h-100">
                        <div class="col">
                            <div class="col">
                                <img src="${products.imgSrc}" alt="${products.description}" class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">${products.name}</h4>
                                    <small class="text-muted">${products.soldCount} artículos vendidos</small>
                                </div>
                                <p class="mb-1">${products.description}</p>
                                <p class="mb-1 h3">${products.cost} ${products.currency}</p>
                            </div>
                        </div>
                    </a>
                    </div>
            
        `;
            }
        }
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    };

};
//agregue esta funcion que guardara el nombre del producto que hago click y redirecciona
function goToProduct(nameProduct){
    localStorage.setItem('nameProduct', JSON.stringify(nameProduct));
    window.location.href="product-info.html";
}

//Entrega 2
//Criterios para ordenar
const ORDER_ASC_BY_COST = "AscCost";
const ORDER_DESC_BY_COST = "DescCost";
const ORDER_BY_RELEVANCE = "Relevancia";
let currentProductArray = [];
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;
//Funcion que ordena
function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (parseInt(a.cost) < parseInt(b.cost)) { return -1; }
            else if (parseInt(a.cost) > parseInt(b.cost)) { return 1; }
            else { return 0 };
        })
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (parseInt(a.cost) > parseInt(b.cost)) { return -1; }
            else if (parseInt(a.cost) < parseInt(b.cost)) { return 1; }
            else { return 0 };
        })
    } else if (criteria === ORDER_BY_RELEVANCE) {
        result = array.sort(function (a, b) {
            if (parseInt(a.soldCount) > parseInt(b.soldCount)) { return -1; }
            else if (parseInt(a.soldCount) < parseInt(b.soldCount)) { return 1; }
            else { return 0 };
        })
    };
    //obtengo el array ordenado con el criterio elegido
    return result
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductArray = productsArray;
    };
    currentProductArray = sortProducts(currentSortCriteria, currentProductArray);

    showProducts(currentProductArray);
}






document.addEventListener("DOMContentLoaded", function (e) {
    //Obtengo los datos del json y los ordeno en orden ascendente de costo
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_BY_RELEVANCE, resultObj.data);
        };
    })

    //Al darle click cambia el orden dependiendo de la condicion
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST, currentProductArray);
    });
    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST, currentProductArray);
    });
    document.getElementById("sortByRelevance").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_RELEVANCE, currentProductArray);
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function () {
        //Ingreso maximo y minimo 
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }
        //Utilizo el criterio que este seleccionado previamente y al nuevo array
        sortAndShowProducts(currentSortCriteria, currentProductArray);
    });



    //Borro los minCost y maxCost y vacio las variables
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        sortAndShowProducts(currentSortCriteria, currentProductArray)
    });



});