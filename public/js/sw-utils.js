

// Guardar  en el cache dinamico
function actualizaCacheDinamico( dynamicCache, req, res ) {


    if ( res.ok ) {

        return caches.open( dynamicCache ).then( cache => {

            cache.put( req, res.clone() );
            
            return res.clone();

        });

    } else {
        return res;
    }

}

// Cache with network update
function actualizaCacheStatico( staticCache, req, APP_SHELL_INMUTABLE ) {


    if ( APP_SHELL_INMUTABLE.includes(req.url) ) {
        // No hace falta actualizar el inmutable
        // console.log('existe en inmutable', req.url );

    } else {
        // console.log('actualizando', req.url );
        return fetch( req )
                .then( res => {
                    return actualizaCacheDinamico( staticCache, req, res );
                });
    }



}

//Network with cache fallback / update
function manejoAPIMensajes ( cacheName , req){

    if( req.clone().method === 'POST'){

        //POSTEO de un nuevo mensaje (no lo puedo cachear y me da error)
        //Intercepto y lo guardo hasta que tenga conexión (si no puedo enviarla de una)


        //Primero pregunto porque no está aceptado por todos los navegadores
        if (self.registration.sync ){ //Segun caniuse.com solo los Android

            return req.clone().text().then( body => {

                //console.log(body);
                const bodyObj = JSON.parse( body );
                return guardarMensaje( bodyObj );

            });

            
        }else{

            return fetch( req );

        }

        
    }else{

        return fetch( req ).then( res => {

            if ( res.ok ){
                //Actualizo el cache dinamico
                actualizaCacheDinamico( cacheName, req, res.clone() );
                return res.clone();
            }else{

                return caches.match(req);
            }

        }).catch( err=> {  //Por si no tengo conexion a internet y falla el fetch
            return caches.match(req);
        });
    }

}