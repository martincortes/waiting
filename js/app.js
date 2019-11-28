var url = window.location.href;
var swLocation = '/waiting/sw.js';


if ( navigator.serviceWorker ) {


    if ( url.includes('localhost') ) {
        swLocation = '/sw.js';
    }


    navigator.serviceWorker.register( swLocation );
}

// $.getScript('js/app-utils.js', function() {
//     console.log('Utiles cargados.');
// });
var totalcomanda = 0;

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
                id: 65856,
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





$.each(menu.menuitems, function(i, item) {
    htmlPlato(item);
});

$(".sumaplato").click(function(){
    // alert("Busco "+$(this).attr("plato"));
    var plato = getPlato($(this).attr("plato"));
    agregaPlatoAComanda(plato.id);
});

// $("#prueba").append("asldasd");
// $("#prueba").append(menu.menu);
