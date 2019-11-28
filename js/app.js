var url = window.location.href;
var swLocation = '/waiting/sw.js';


if ( navigator.serviceWorker ) {


    if ( url.includes('localhost') ) {
        swLocation = '/sw.js';
    }


    navigator.serviceWorker.register( swLocation );
}



var menu = {
        "comercio": "Las Lilas",
        "menuitems": [ 
            {
                id: 2344,
                categoria: ["almuerzo", "cena"], 
                plato: "Pato a la naranja", 
                ingredientes: "Pollo y hornoUn pato de 1.5 kg \
                5 naranjas \
                Un vaso de Cointreau \
                1 cucharada sopera de vinagre \
                1 cucharadita de mantequilla \
                Un vaso de caldo de ave \
                2 cucharaditas de harina de maíz \
                una pizca de sal y pimienta negra.", 
                precio: 34.5, 
                // imagen: file
            },
            {
                id: 65656,
                categoria: ["postre"], 
                plato: "Flan de dulce de leche",
                ingredientes: "Flan y dulce de leche",
                precio: 46,
                // imagen: file
            },
            {
                id: 65656,
                categoria: ["postre"], 
                plato: "Brownie",
                ingredientes: "Dulce de leche y chocolate amargo",
                precio: 76.5,
                // imagen: file
            },
            {
                id: 3456,
                categoria: ["entrada"], 
                plato: "Ensalada César",
                ingredientes: "Verdes con croutones y salsa césar de la casa",
                precio: 23.6,
                // imagen: file
            }

        ]
};


function htmlPlato( plato ){

        var contenido = `<div class="card card-body">
        <div class="row justify-content-start">
            <div class="col-10 col-md-9 plato " >
                <div class="row justify-content-around">
                    <div class="col-1 col-xs-1 col-sm-1 col-md-2 align-self-center text-center" >
                        <button class="btn btn-primary row justify-content-start sumaplato" plato="${plato.id}">
                            <i class="fa fa-plus-square"></i>
                        </button>
                    </div>
                    <div class="col-10 col-xs-10 col-sm-11 col-md-10">
                        <button class="btn btn-block nombreplato text-left" type="button" 
                        data-toggle="collapse" data-target="#plato${ plato.id }"  
                        href="#collapseExample" aria-expanded="false" aria-controls="collapseExample" >
                            ${ plato.plato }
                        </button>
                        <div class="collapse detalleplato" id="plato${ plato.id }">
                        ${ plato.ingredientes }
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-2 col-md-2 precio align-self-center text-right rt" >
                $${ plato.precio }
            </div>
    `;
    $("#comidas").append(contenido);

}

function getPlato (id){
    var respuesta = false;
    $.each(menu.menuitems, function(i, item) {
        // console.log("Comparo "+id+" con "+item.id);
        if(item.id == id){
            respuesta = item;        
            // return respuesta;
        }  
    });
    // console.log("Retorno "+respuesta);
    return respuesta;
}


$.each(menu.menuitems, function(i, item) {
    htmlPlato(item);
});

$(".sumaplato").click(function(){
    // alert("Busco "+$(this).attr("plato"));
    var plato = getPlato($(this).attr("plato"));
    alert(plato.id);
});

// $("#prueba").append("asldasd");
// $("#prueba").append(menu.menu);
