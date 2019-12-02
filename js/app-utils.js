

function htmlPlato( plato ){

    var contenido = `<div class="card card-body py-1">
    <div class="row justify-content-start">
        <div class="col-10 col-md-9 plato">
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

function agregaPlatoAComanda(id){

    if(jQuery.inArray(id, platosencomanda) === -1){
        var respuesta = 'OK';
    }else{
        var respuesta = 'EXISTE';
    }

    var plato = getPlato(id);

    var contenido = `
    <div class="platoencomanda row w-100 justify-content-center m-0 p-0 rt">
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
    <div class="row h-75 justify-content-center align-items-center m-0 p-0">
    <section id="qr" class="d-flex flex-row justify-content-center p-2 flex-shrink-1" style="max-height: 30%;"></section>
    <div class="row w-100">
        <div class="col-1 col-sx-1 col-md-3"></div>
        <div class="col-10 col-sx-10 col-md-6 text-center align-middle">
                <button type="button" class="btn btn-success btn-block" style="white-space: normal;" id="soycliente">
                    <div class="row">
                        <div class="col-4 text-center">
                                <i class="fa fa-utensils fa-4x m-4"></i>
                        </div>
                        <div class="col-8 text-left align-self-center m-0" >
                            <legend class="h4 m-0 align-text-bottom pb-0" style="line-height: 0.8em;">Quiero</legend>
                            <legend class="h1 m-0 align-text-top pt-0"><strong>comer!</strong></legend>
                        </div>
                    </div>
                </button>
                <button type="button" class="btn btn-dark btn-block" style="white-space: normal;">
                    <div class="row">
                        <div class="col-4 text-center">
                                <i class="fa fa-map-marked-alt fa-2x"></i>
                        </div>
                        <div class="col-8 text-left align-self-center m-0" >
                            &nbsp;Soy un <strong>restaurant</strong>
                        </div>
                    </div>
                </button>
        </div>
        <div class="col-1 col-sx-1 col-md-3"></div>
    </div>
</div>
    `;

    $("#ppal").html(html);
}

function bienvenidaComercio(comercio, mesa){

    // partes = qr.split('/');
    // comercio = partes[4];
    // mesa = partes[5];
    //alert("Ta que te pario" + comercio + " "+ mesa);

    addTodo('comercio','_comercio',comercio);

    //Acá debería ir al backend a traerme los datos del comercio
    dibujaHeaderComercio(comercio,mesa);
    
    dibujaMenuComercio(comercio,mesa);

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
    <header class="row titulo pt-3">
    <div class="col-8 col-xs-8 col-md-9 align-self-center">
        <div class="row justify-content-start">
            <div class="col">
                <p class="h4 nombrecomercio">
                    <i class="fa fa-utensils"></i>
                    Las Lilas <small class="text-muted d-none d-md-inline  ">Restaurant [${ comercio }] </small>
                </p>
            </div>
        </div>
    </div>
    <div class="col-4 col-xs-4 col-md-3 mr-0 p-2 text-right"> <!-- imagen del restaurant-->
        <img class="img-fluid img-responsive img-thumbnail" src="img/avatars/laslilas.jpg" style="max-height:80px;">
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
    <section class="menu row w-100">
        <main class="col-12 col-sm-12 col-md-8 justify-content-start">
                <button class="btn btn-block" type="button" data-toggle="collapse" data-target="#comidas" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample" >
                    Comidas
                </button>        
                <div class="collapse show" id="comidas"></div>
                <!-- <section class="footermenu" style="height: 200px; background: blue;"></section> -->
        </main>
        <aside class="col-12 col-sm-12 col-md-4 align-self-center justify-content-md-end">
            <div class="row w-100 m-0 p-0 d-none" id="aside-body" >
                <div class="row bordeabajo justify-content-center rt m-2 w-100">Tu pedido actual:</div>
                <div class="row m-2 w-100" id="comanda"></div>
                
                <div class="row justify-content-around w-100">
                    <div class="col-8 text-right p-2">Total</div>
                    <div class="col-4 text-right border-top p-2" id="totalcomanda"></div>
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

function inicio(){
    
    db.allDocs({include_docs: true })
    .then( docs => {
        let bla = 0;
        docs.rows.forEach( row => {
            
            console.log(row.doc._id);                    
            console.log(row.doc.clave);                    
            if(row.doc.clave == 'comercio'){
                comercio = row.doc.valor;
                console.log("Ya estoy en comercio " + comercio);
                bienvenidaComercio(comercio,0);
            }
        });
        return bla;
    });
    //Sigo y presento pantalla inicio cliente/restaurant
    bienvenidaGenerica();
}

// function showTodos() {

//     db.allDocs({include_docs: true })
//       .then( doc => {
//         //redrawTodosUI(doc.rows);
//         console.log(doc.rows);
//       });
//   }
