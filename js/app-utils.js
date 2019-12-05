

function htmlPlato( plato ){

    var contenido = `<div class="card card-body py-0 m-0">
    <div class="row justify-content-start my-0 py-0">
        <div class="col-10 col-md-9 p-0 m-0">
            <div class="row justify-content-around m-0 p-0">
                <div class="col-1 col-xs-1 col-sm-1 col-md-2 align-self-center text-center p-0" >
                    <button class="btn btn-primary row justify-content-start bg-warning border-light sumaplato" plato="${plato.id}">
                        <i class="fa fa-plus-square"></i>
                    </button>
                </div>
                <div class="col-10 col-xs-10 col-sm-11 col-md-10 m-0 p-0">
                    <button class="btn btn-block text-left" type="button" 
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
        <div class="col-2 col-md-2 precio align-self-center text-right rt border rounded p-1" >
            $${ plato.precio }
        </div>
    `;
    plato.categoria.forEach( categoria => {
        switch(categoria){
            case 'almuerzo':
            case 'cena':    $("#comidas").append(contenido);
                            break;
            
            case 'entrada': $("#entradas").append(contenido);
                            break;
            
            case 'postre': $("#postres").append(contenido);
                            break;

            case 'bebida': $("#bebidas").append(contenido);
                            break;
        }
        
    });
  
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

function agregaPlatoAComanda(id){

    if(jQuery.inArray(id, platosencomanda) === -1){
        var respuesta = 'OK';
    }else{
        var respuesta = 'EXISTE';
    }

    var plato = getPlato(id);

    var contenido = `
    <div class="platoencomanda text-white row w-100 justify-content-center m-0 p-0 rt">
        <div class="col-1 col-md-0 m-0 p-0"></div>
        <div class="col-8 col-md-8 pr-2" id="plato${ plato.id }">
        ${ plato.plato }
        </div>
        <div class="col-3 col-md-3 precio align-self-center text-center m-0 p-0 rt">
            $${ plato.precio }
        </div>
    </div>
    `;
    totalcomanda = totalcomanda + plato.precio;
    $("#comanda").append(contenido);
    $("#totalcomanda").html('$'+totalcomanda.toFixed(2)+'.-');

    //falta el if
    if( $("#aside-body").hasClass('d-none')){
        $("#aside-body").removeClass('d-none');
    }

    platosencomanda.push(id);

    return respuesta;
}

function bienvenidaGenerica(){

    const html = `
    <div class="row h-100 justify-content-center align-self-center m-0 p-0">
    <div class="row w-100 justify-content-center align-self-center h-100">
        <div class="col-1 col-sx-1 col-md-3"></div>
        <div class="col-10 col-sx-10 col-md-6 justify-content-center align-middle align-self-center">
            <div class="row w-100" >
                <div class="card d-flex flex-column img-fluid shadow p-1 mb-1 bg-dark rounded" style="width:500px" id="soycliente">
                    <img class="card-img-top border border-secondary " src="img/avatars/fondocard_sd.jpg" alt="Card image" style="width:100%">
                    <div class="card-img-overlay h-100 d-flex flex-column justify-content-end m-0">
                        <p style="line-height:10px;" class="text-white text-right m-0">
                        <span style="font-size:1.5em;" class="gv rt"> Waiting.</span>
                        <span class="text-warning rt m-0">bienvenido</span></p>
                    </div>
                </div>
            </div>
            <div class="row w-100 text-white justify-content-center">
                <div class="row d-flex justify-content-around w-100">
                    <div class="col-2">
                        <button class="btn btn-dark justify-content-center text-center border border-secondary rounded">
                                <i class="fa fa-qrcode"></i>
                        </button>
                    </div>
                    <!-- <div class="col-2">
                        <button class="btn btn-dark text-center border border-secondary rounded">
                                <i class="fa fa-cog"></i>
                        </button>
                    </div> -->
                    <div class="col-8">
                        <button class="col-12 btn btn-dark text-center border border-secondary rounded" >
                            <strong>ingresar</strong>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-1 col-sx-1 col-md-3"></div>
    </div>
</div>
          

    <div id="elModal" class="hide fade" style="z-index:9999; position:absolute; top:0px;">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content bg-dark">
            <div class="modal-body bg-dark" id="modalQR" style="max-height:70%; max-width:80%; margin-left:15%;">
            </div>
        </div>
        <div class="modal-footer border-top-0" >
            <button type="button" class="btn btn-success" data-dismiss="modal">Ok</button>
        </div>
    </div>
    </div>

    
    `;

    $("#ppal").html(html);
    $("#soycliente").on('click',function(){
        $("#modalQR").load('js/libs/plugins/qr/qr.html');
    });
}

function bienvenidaComercio(comercio, mesa){

    // partes = qr.split('/');
    // comercio = partes[4];
    // mesa = partes[5];
    //alert("Ta que te pario" + comercio + " "+ mesa);

    addTodo('comercio','_comercio',comercio+'@'+mesa);

    //Acá debería ir al backend a traerme los datos del comercio
    dibujaHeaderComercio(comercio,mesa);
    
    dibujaMenuComercio(comercio,mesa);

    dibujaFooter();

    $.each(menu.menuitems, function(i, item) {
        htmlPlato(item);
    });

    $('.sumaplato').on('click', function(){
        var plato = getPlato($(this).attr("plato"));
        var rta = agregaPlatoAComanda(plato.id);
        
        switch(rta){
            case 'OK':
                var mensaje = 'Plato agregado a la comanda [<b>$'+totalcomanda+'.-</b>]';
                mdtoast(mensaje,{
                    duration: 1000, 
                    init: false,
                    type: mdtoast.SUCCESS
                });
            break;
            case 'EXISTE':
                    var mensaje = 'El plato ya se encontraba en el pedido [<b>$'+totalcomanda+'.-</b>]';
                    mdtoast(mensaje,{
                        duration: 2000, 
                        // interaction: true,
                        init: false,
                        type: mdtoast.INFO
                    });
            break;
        }
    });
}

function dibujaHeaderComercio(comercio,mesa){

    var header = `
    <header class="row titulo pt-3 bg-dark border-bottom border-warning sombrawarning">
    <div class="col-8 col-xs-8 col-md-9 align-self-center">
        <div class="row justify-content-start">
            <div class="col">
                <p class="h4 nombrecomercio text-white">
                    <i class="fa fa-utensils"></i>
                    Las Lilas <small class="text-muted d-none d-md-inline  ">Restaurant [${ comercio }] </small>
                </p>
            </div>
        </div>
    </div>
    <div class="col-4 col-xs-4 col-md-3 mr-0 p-2 text-right"> <!-- imagen del restaurant-->
        <img class="img-fluid img-responsive bg-secondary border border-warning rounded sombrawarning" src="img/avatars/laslilas.jpg" style="max-height:80px;">
    </div>
    </header>`;
    console.log("Actualizo header");
    //console.log($("#ppal", parent.document).html());
    $("#ppal", parent.document).html(header);

    // var jbScanner = new JsQRScanner(onQRCodeScanned);
    
    // jbScanner.stopScanning();
    
    //Ya capturé
    flag = 1;
    
}

function dibujaMenuComercio(comercio, mesa){

    var menu = `
    <section class="menu row w-100 h-auto">
        <main class="col-12 col-sm-12 col-md-8 justify-content-start">
                <button class="btn btn-block btn-secondary border-dark" type="button" data-toggle="collapse" data-target="#entradas" href="#entradas" aria-expanded="false" aria-controls="entradas" >
                    Entradas
                </button>        
                <div class="collapse" id="entradas"></div>
                <button class="btn btn-block btn-secondary border-dark" type="button" data-toggle="collapse" data-target="#comidas" href="#comidas" aria-expanded="false" aria-controls="comidas" >
                    Comidas
                </button>        
                <div class="collapse show" id="comidas"></div>
                <button class="btn btn-block btn-secondary border-dark" type="button" data-toggle="collapse" data-target="#bebidas" href="#bebidas" aria-expanded="false" aria-controls="bebidas" >
                    Bebidas
                </button>        
                <div class="collapse" id="bebidas"></div>
                <button class="btn btn-block btn-secondary border-dark" type="button" data-toggle="collapse" data-target="#postres" href="#postres" aria-expanded="false" aria-controls="postres" >
                    Postres
                </button>        
                <div class="collapse" id="postres"></div>
        </main>
        <aside class="col-12 col-sm-12 col-md-4 align-self-center justify-content-md-end">
            <div class="row w-100 m-0 p-0 d-none text-white" id="aside-body" >
                <div class="row border-bottom border-warning justify-content-start rt m-2 w-100">Tu pedido actual:</div>
                <div class="row m-2 w-100" id="comanda"></div>
                
                <div class="row justify-content-around w-100">
                    <div class="col-6 text-center p-1 justify-content-center">
                        <button class="btn btn-outline-warning p-1">Confirmar</button>
                    </div>
                    <div class="col-3 text-right p-2">Total</div>
                    <div class="col-3 text-right border-top p-2" id="totalcomanda"></div>
                </div> 
            </div>
            <div class="row w-100"><br></div>
        </aside>
        
    </section>
    `;
    // $("#ppal").append(menu);
    console.log("Actualizo menu");
    //console.log($("#ppal", parent.document).html());
    $("#ppal", parent.document).append(menu);
}

function dibujaFooter(){
    const footer = `
    <div class="row w-100 m-0 justify-content-center">
    <div class="col-3 align-self-top text-center pt-1" >
        <i class="fa fa-home" aria-hidden="true"></i>
    </div>
    <div class="col-3 align-self-top text-center pt-1">
        <i class="fa fa-tasks" aria-hidden="true"></i>
    </div>
    <div class="col-3 align-self-top text-center pt-1" id="logout">
        <i class="fa fa-sign-out-alt" aria-hidden="true"></i>
    </div>
    </div>
    `;
    $("#footer").html(footer);
    $("#logout").click(function(){
        logoutComercio();
    });

}

function footerGenerico(){
    const footer = `
    <div class="col-12 align-self-center">
        <div class="row">
            <div class="col">
                <p class="h6 text-right pt-1 gv">
                    Waiting
                    <small class="text-muted">Maitre suite.</small>
                </p>
            </div>
        </div>
    </div>
    `;
    $("#footer").html(footer);
}

function addTodo(clave, tipo, valor) {

    if(valor.length <= 0)  return; //No guardo vacíos
    let mensaje = {
        _id: new Date().toISOString(),
        clave: clave,
        tipo: tipo,
        valor: valor,
        sincronizado: false
    };

    db.put( mensaje ).then( console.log ('Insertado en bbdd'))
                .catch( console.log );
}

function logoutComercio(){
    db.allDocs({include_docs: true })
      .then( docs => {
          docs.rows.forEach( row => {

            if(row.doc.clave == 'comercio'){
                row.doc.valor = 0;
                               
                db.put( row.doc ).then( console.log ('Comercio eliminado'))
                 .catch( console.log );
                
                bienvenidaGenerica();
                footerGenerico();
                return true;
            }
          });
      });
}

function inicio(){
    
    db.allDocs({include_docs: true })
    .then( docs => {
        let comercio = 0;
        docs.rows.forEach( row => {            
            if(row.doc.clave == 'comercio'){
                comercio = row.doc.valor;
                console.log("Ya estoy en comercio " + comercio);
                //bienvenidaComercio(comercio,0);
                return comercio;
            }
        });
        return comercio;
    }).then( comercio => {
        if(comercio){
            bienvenidaComercio(comercio.split('@')[0], comercio.split('@')[1]);
        }else{
            //Me fijo si viene la url desde la camara para abrir en navegador
            if(tmp = reciboURLDesdeNavegador()){

                bienvenidaComercio(tmp.split('@')[0], tmp.split('@')[1]);

            }else{
                //Sigo y presento pantalla inicio cliente/restaurant
                bienvenidaGenerica();
                footerGenerico();
            }

        }
    });
    // bienvenidaGenerica();
}

function reciboURLDesdeNavegador(){

    const url = window.location.href;
    console.log("URL ", url);
    var hash = url.split('?')[1];
    console.log("HASH", hash);
    //ZWAIT_@_123_@_4
    // hash = 'c4a09099ebf7f6aadf8a52fc14d7bc46';

    const maxID = 999;
    const maxMesa = 10;

    for(i=1;i<maxID;i++){
        id = completaCeros(i,maxID.toString().length);
        tmp = 'ZWAIT_@_'+id+'_@_';
        for(m=1;m<maxMesa;m++){
            tmpm = tmp+m;
            hashtmp = md5(tmpm);
            if(hashtmp == hash){
                console.log("Recibo comercio "+id+" mesa "+m);
                return id+'@'+m;
            }
        }
        
    }
    return false;
}

function completaCeros(n, largo){
    while(n.toString().length < largo){
        n = '0'+n;
    }
    return n;   
}

// function showTodos() {

//     db.allDocs({include_docs: true })
//       .then( doc => {
//         //redrawTodosUI(doc.rows);
//         console.log(doc.rows);
//       });
//   }
