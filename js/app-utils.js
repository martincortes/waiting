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
                flag = 0;                
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
            //Me fijo si viene la url desde la url
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

function reciboURLDesdeNavegador(qr){
    
    let urlString = '';
    if(qr){
        urlString = qr;    
    }else{
        urlString = window.location.href;    
    }
 
    console.log("URL ", urlString);
    var hash = urlString.split('?')[1];
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
