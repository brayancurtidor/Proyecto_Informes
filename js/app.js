const identificacionFor=document.querySelector('#identificacion');
const nombresFor=document.querySelector('#nombres');
const apellidosFor=document.querySelector('#apellidos');
const correoFor=document.querySelector('#correo');
const telefonoFor=document.querySelector('#telefono');
const fechaFor=document.querySelector('#fecha');
const horaFor=document.querySelector('#hora');
const direccionFor=document.querySelector('#direccion');
const serviciosFor=document.querySelector('#servicios');
const expresionregular=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let editando;

//interfaz grafica
const formularioF=document.querySelector('#nueva-cita');
const ContenedorinformesF=document.querySelector('#citas');
listadoeventos();
//clase para los informes
class informe{
    constructor()
    {
        this.citas=[];

    }
    agregarinforme(informe)
    {
        this.citas=[...this.citas,informe] //agregando al array un objeto con un id diferente
        console.log(this.citas)
        
    }
    eliminarInforme(idborrar)// ya se le pasa el id cuando al boton se le da onclick al boton de borrar
    {
        this.citas=this.citas.filter(informeborrar=> informeborrar.id!==idborrar)
        console.log(this.citas)
    
    }
    editarinforme(informeactualizadao)
    {
        //map porque recorre el arreglo y me crea uno nuevo
        this.citas=this.citas.map(informeeditar=>informeeditar.id===informeactualizadao.id ? informeactualizadao : informeeditar) //si los ids coinciden entonces se va a reeescribir el informe de caso contrario no lo va a hacer si no s¿que se mantendra
        
    }
   

}
//clase para la interfaz grafica
class interfazusuario{
    ImprimirAlerta(mensaje,tipomensaje)
    {
        //console.log(mensaje)
        //creando div de error
        const viderror=document.createElement('div');
        viderror.classList.add('text-center','alert','d-block','col-12');
        //agregar clase en base de tipo de eeror
        if(tipomensaje==='error')
        {
            viderror.classList.add('alert-danger');

        }
        else{
            viderror.classList.add('alert-success');
            //reiniciando objeto
            
        }
        viderror.innerHTML=mensaje;

        //ya que esta creado el div de error
        //en donde lo tenemos que mostrar en algun lugar
        document.querySelector('#contenido').insertBefore(viderror,document.querySelector('.agregar-cita'))
        setTimeout(() => {
            viderror.remove();
           
        }, 3000);

    }
    Imprimirinformes(informesImprimir) 
    {
        this.limpiarHtml();
        const{citas}=informesImprimir;//acceder de forma mas directa al arreglo del objeto
        //console.log(citas);
        citas.forEach(citasrecorrido => {
            const { identificacion,nombres,apellidos,correo,telefono,fecha,hora,direccion,servicios,id}=citasrecorrido;
          
        
            const vidiarrayinformes=document.createElement('div');
            vidiarrayinformes.classList.add('cita','p-3');
            vidiarrayinformes.dataset.id=id;
            //scriptin de kos elemenentos de  los ionformes
            const indentificacionParrafo=document.createElement('h2')
            indentificacionParrafo.classList.add('card-title','font-weight-bolder');
            indentificacionParrafo.textContent=`identificacion: ${identificacion}` ;
             //insertra nombres al div
             const nombresParrafo=document.createElement('p')
             nombresParrafo.innerHTML=`<span class="font-weight-bolder">Nombres: </span> ${nombres}` ;

             const apellidosParrafo=document.createElement('p')
             apellidosParrafo.innerHTML=`<span class="font-weight-bolder">Apellidos: </span> ${apellidos}` ;
             
             const correoParrafo=document.createElement('p')
             correoParrafo.innerHTML=`<span class="font-weight-bolder">Correo: </span> ${correo}` ;
            
             const telefonoParrafo=document.createElement('p')
             telefonoParrafo.innerHTML=`<span class="font-weight-bolder">telefono: </span> ${telefono}` ;
            
             const fechaParrafo=document.createElement('p')
             fechaParrafo.innerHTML=`<span class="font-weight-bolder">fecha Instalacion: </span> ${fecha}` ;
            
             const horaParrafo=document.createElement('p')
             horaParrafo.innerHTML=`<span class="font-weight-bolder">hora: </span> ${hora}` ;
            
             const direccionParrafo=document.createElement('p')
             direccionParrafo.innerHTML=`<span class="font-weight-bolder">direccion: </span> ${direccion}` ;
            
             const serviciosParrafo=document.createElement('p')
             serviciosParrafo.innerHTML=`<span class="font-weight-bolder">servicios: </span> ${servicios}` ;
             
            //boton de eliminar informe
            const btnEliminar=document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-2')
            btnEliminar.innerHTML='Borrar <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>'; 
            btnEliminar.onclick=() => eliminarinforme(id); // el id del structuring

            //se añade al html o el boton de editar

            const btneditar=document.createElement('button');
            btneditar.classList.add('btn','btn-warning','mr-2')
            btneditar.innerHTML='editar <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>'; 
            btneditar.onclick=() => cargaredicion(citasrecorrido); // tomamos la varibel del foreach ya que esta recorre a cada eleemnto del array
    

            //agregar los parrafos al vid informes
            vidiarrayinformes.appendChild(indentificacionParrafo);
            vidiarrayinformes.appendChild(nombresParrafo);
            vidiarrayinformes.appendChild(apellidosParrafo);
            vidiarrayinformes.appendChild(correoParrafo);
            vidiarrayinformes.appendChild(telefonoParrafo);
            vidiarrayinformes.appendChild(fechaParrafo);
            vidiarrayinformes.appendChild(horaParrafo);
            vidiarrayinformes.appendChild(direccionParrafo);
            vidiarrayinformes.appendChild(serviciosParrafo);
            vidiarrayinformes.appendChild(btnEliminar);
            vidiarrayinformes.appendChild(btneditar)

            //agregar los informes a los html
            ContenedorinformesF.appendChild(vidiarrayinformes)

        });
  
    }
    limpiarHtml()
    {
        while (ContenedorinformesF.firstChild)
        {
            ContenedorinformesF.removeChild(ContenedorinformesF.firstChild)
        }
    }
    //sicronizar con storage
  
    

}
//instanacias globales
const instanciainterfaz= new interfazusuario()
const administradorinforme=new informe();


function listadoeventos()
{
    identificacionFor.addEventListener('input',datosInfromes); //change puedo tomar el valor del input para validarlos cada vez qeu se sale
    nombresFor.addEventListener('input',datosInfromes);
    apellidosFor.addEventListener('input',datosInfromes);
    correoFor.addEventListener('input',datosInfromes);
    telefonoFor.addEventListener('input',datosInfromes);
    fechaFor.addEventListener('input',datosInfromes);
    horaFor.addEventListener('input',datosInfromes);
    direccionFor.addEventListener('input',datosInfromes);
    serviciosFor.addEventListener('input',datosInfromes);
    formularioF.addEventListener('submit',nuevoinforme); //validaciones y agregar informes
   


  

}
//objeto con los datos del cliente
const informeOBJETO={
    identificacion:'',
    nombres:'',
    apellidos:'',
    correo:'',
    telefono:'',
    fecha:'',
    hora:'',
    direccion:'',
    servicios:''
}


//funcion para llenar un objeto
function datosInfromes(e)
{
//console.log(e.target.name); //tomar el valor que se escribe
//llenar el objeto
informeOBJETO[e.target.name]=e.target.value;

console.log(informeOBJETO)

}
//funcion para avalidar y agregar nuevos infiormes
function nuevoinforme(e)
{
    e.preventDefault();
    //extraer la informacion del objeto de informes
    const { identificacion,nombres,apellidos,correo,telefono,fecha,hora,direccion,servicios}=informeOBJETO

    //validar la informacion del objeto ya que esta lleno el objeto
    if(identificacion===''||nombres===''||apellidos===''||correo===''||telefono===''||fecha===''||hora===''||direccion===''||servicios==='')
    {
       instanciainterfaz.ImprimirAlerta('odos los campos son requeridos','error');
        
        return;
    }

    if(editando)
    {
        console.log('Modo Edicion')
        instanciainterfaz.ImprimirAlerta('Edicion Guadada correctamente','correctoss');
        //pasar el objeto  al informe

        administradorinforme.editarinforme({...informeOBJETO})



        formularioF.querySelector('button[type="submit"]').textContent='Crear informe';
        formularioF.querySelector('button[type="submit"]').classList.remove('btn','btn-warning');
        formularioF.querySelector('button[type="submit"]').classList.add('btn','btn-success');
        editando=false; //esto para volver a modo crear 
    }
    else{
        instanciainterfaz.ImprimirAlerta('correcto','correctoss');
    //generar un id unico agregar un nuevo campo al objeto
    informeOBJETO.id=Date.now();
    //console.log(informeOBJETO)
        //usaremos a instancia para agregar objetos dentro un el array 
    //administradorinforme.agregarinforme(informeOBJETO); //el problema es que se ingresa al aarray pero se duplican los datos ya que se pasa el objeto global  
    administradorinforme.agregarinforme({...informeOBJETO}); //solucion pegamos la copia
       //mostrar los informes seguns e van agregando
    
        console.log('Modo nuevos')
    }
    instanciainterfaz.Imprimirinformes(administradorinforme); //usamos este parametro ya el tiene el array


    

    
    reiniciar(); //se tiene que reiniciar por que dejaba agregar objetos cuando los inputs estabana vacios
    formularioF.reset();
 
    

}

//funcion para reiniciar objeto, ya que me dejaba agregar mas objetos aun cuando los campos estuviesen vacios
function reiniciar()
{
    informeOBJETO.identificacion='';
    
    informeOBJETO.nombres='';
    
    informeOBJETO.apellidos='';
    
    informeOBJETO.correo='';
    
    informeOBJETO.telefono='';
    
    informeOBJETO.fecha='';
    
    informeOBJETO.hora='';
    
    informeOBJETO.direccion='';
    
    informeOBJETO.servicios='';
    
  
}
function eliminarinforme(ids)
{
    //eliminar el un informe o el objeto del array
    administradorinforme.eliminarInforme(ids)

    //mostrar mensaje
    instanciainterfaz.ImprimirAlerta('se elimino el informe con exito!!!','correcto');

    //refrescar los informes

    instanciainterfaz.Imprimirinformes(administradorinforme)
  

}
//carga los datos y el modo edicion
function cargaredicion(array_informes)
{

//destructuring para llenar el los inputs
const { identificacion,nombres,apellidos,correo,telefono,fecha,hora,direccion,servicios,id}=array_informes
/*llenar el objeto ya que almoneto de darle al boton editar
y despues al botonde agregar da un error (campos vacios )
aunque tengainformacion
solucion: llenar el objeto
*/
informeOBJETO.identificacion=identificacion;
informeOBJETO.nombres=nombres;
informeOBJETO.apellidos=apellidos;
informeOBJETO.correo=correo;
informeOBJETO.telefono=telefono;
informeOBJETO.fecha=fecha;
informeOBJETO.hora=hora;
informeOBJETO.direccion=direccion;
informeOBJETO.servicios=servicios;
informeOBJETO.id=id;


//llenar los inputs
identificacionFor.value=identificacion;
nombresFor.value=nombres;
apellidosFor.value=apellidos;
correoFor.value=correo;
telefonoFor.value=telefono;
fechaFor.value=fecha;
horaFor.value=hora;
direccionFor.value=direccion;
serviciosFor.value=servicios;





//cambiar el color del boton para editar
formularioF.querySelector('button[type="submit"]').textContent='Confirmar edicion';
formularioF.querySelector('button[type="submit"]').classList.add('btn','btn-warning');
editando=true;

}



