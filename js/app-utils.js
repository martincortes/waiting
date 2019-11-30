

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
    $("#aside-body").removeClass('d-none');

    platosencomanda.push(id);

    return respuesta;
}

function dibujaComercio(qr){

    partes = qr.split('/');
    comercio = partes[4];
    mesa = partes[5];
    // alert("Ta que te pario" + comercio + " "+ mesa);

    //Acá debería ir al backend a traerme los datos del comercio
    var rta = dibujaHeaderComercio(comercio,mesa);
    console.log(rta);
    //dibujaMenuComercio(comercio,mesa);

}

function dibujaHeaderComercio(comercio,mesa){

    var header = `
    <header class="row titulo pt-3">
    <div class="col-8 col-xs-8 col-md-9 align-self-center">
        <div class="row justify-content-start">
            <div class="col">
                <p class="h4 nombrecomercio">
                    <i class="fa fa-utensils"></i>
                    Las Lilas <small class="text-muted">Restaurant [${ comercio }] </small>
                </p>
            </div>
        </div>
    </div>
    <div class="col-4 col-xs-4 col-md-3 mr-0 p-2 text-right"> <!-- imagen del restaurant-->
        <img class="img-fluid img-responsive" src="img/avatars/laslilas.jpg" style="max-height:80px;">
    </div>
    </header>`;
    alert("BLA");
    console.log("BLA");
    alert($("#ppal", parent.document).html());
    $("#ppal").html(header);
}

function dibujaMenuComercio(comercio, mesa){


}