

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

function agregaPlatoAComanda(id){
    var plato = getPlato(id);

    var contenido = `
    <div class="platoencomanda row w-100 justify-content-around">
        <div class="col-5 col-md-8" id="plato${ plato.id }">
        ${ plato.plato }
        </div>
        <div class="col-5 col-md-4 precio align-self-center text-right rt" >
            $${ plato.precio }
        </div>
    </div>
    `;
    totalcomanda = totalcomanda + plato.precio;
    $("#comanda").append(contenido);
    $("#totalcomanda").html('$'+totalcomanda+'.-');

    $("#aside").removeClass('d-none');
}
