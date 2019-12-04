var url = window.location.href;
var swLocation = '/waiting/sw.js';


if ( navigator.serviceWorker ) {


    if ( url.includes('localhost') ) {
        swLocation = '/waiting/sw.js';
    }

    navigator.serviceWorker.register( swLocation );
}

var db = new PouchDB('waiting');


var totalcomanda = 0;
var platosencomanda = new Array();
var flag = 0;

var menu = {
        "comercio": "Las Lilas",
        "menuitems": [ 
            {
                id: 2345,
                categoria: ["almuerzo"], 
                plato: "Pulpo a las brasas", 
                ingredientes: "Pulpo de exportaci&oacute;n de 400grs \
                acompañado de vegetales asados de la huerta.", 
                precio: 115, 
                // imagen: file
            },
            {
                id: 2344,
                categoria: ["almuerzo"], 
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
                categoria: ["bebida"], 
                plato: "Alma Mora Malbec",
                ingredientes: "Vino tinto de origen argentino | 700ml",
                precio: 120,
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





// $.each(menu.menuitems, function(i, item) {
//     htmlPlato(item);
// });

// $('.sumaplato').on('click', function(){
//     alert("Busco "+$(this).attr("plato"));
//     var plato = getPlato($(this).attr("plato"));
//     var rta = agregaPlatoAComanda(plato.id);
    
//     switch(rta){
//         case 'OK':
//             var mensaje = 'Plato agregado a la comanda [<b>$'+totalcomanda+'.-</b>]';
//             mdtoast(mensaje,{
//                 duration: 1000, 
//                 init: false,
//                 type: mdtoast.SUCCESS
//             });
//         break;
//         case 'EXISTE':
//                 var mensaje = 'El plato fue agregado por segunda vez [<b>$'+totalcomanda+'.-</b>]';
//                 mdtoast(mensaje,{
//                     duration: 2000, 
//                     // interaction: true,
//                     init: false,
//                     type: mdtoast.INFO
//                 });
//         break;
//     }
// });
// showTodos();

// const so = yaEstoyEnComercio().then(function(rta){
//     alert("ASDA");
//     alert($("#comercio").html());
//     console.log('VALOR ',rta);
// }).catch( err =>{
//     console.log(err);
// });
// // const comercio = 
// so.then(rta =>{
//     alert("asdasd");
//     alert($("#comercio").html());
// })
// console.log("Antes" + so);
// //console.log('VALOR ',comercio);
// console.log("Despues");

// const comercio = yaEstoyEnComercio();
// if(comercio){
//     alert("Estoy en "+comercio);
// }


inicio();

// $("#soycliente").click(function(){

//     $("#qr").load('js/libs/plugins/qr/qr.html');

// });

// $("#prueba").append("asldasd");
// $("#prueba").append(menu.menu);
