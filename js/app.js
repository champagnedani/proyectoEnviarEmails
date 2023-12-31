document.addEventListener('DOMContentLoaded', function(){

    //SELECCIONANDO ELEMENTO DE LA INTERFAZ
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#CC')
    const inputAsunto = document.querySelector('#asunto')
    const inputMensaje = document.querySelector('#mensaje')
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner');


    //CREANDO OBJETO DONDE SE VA GUARDAR LA INFORCION

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

   

    //ASIGNAR EVENTOS
    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    formulario.addEventListener('submit', enviarEmail);
    inputCC.addEventListener('blur', validarCC)

    btnReset.addEventListener('click', function(e){
        e.preventDefault();
        resetFormulario()
    })

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden')

        setTimeout( () => {
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            resetFormulario()

            //CREANDO UNA ALERTA

            const alertaExito = document.createElement('P')
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Correo enviado con exito'
            formulario.appendChild(alertaExito)
            setTimeout(() => {
                alertaExito.remove();
            },3000)
        }, 3000)


    }

    function validar(e){
        
        if(e.target.value.trim() === ''){ //VALIDA SI EL VALOR DEL FORM ESTA VACIO
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta(`El Email es incorrecto`, e.target.parentElement)
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);

        email[e.target.name] = e.target.value.trim().toLowerCase();
        comprobarEmail()

    };

    function mostrarAlerta(mensaje, referencia){

        //COMPROBAR SI EXISTE ALERTA
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)
        return resultado;
    };

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true;
            return
        }else{
            btnSubmit.classList.remove('opacity-50')
            btnSubmit.disabled = false
        }
    };

    function resetFormulario(){
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    };

    function validarCC(e){
        if(e.target.value.trim() === ''){ //VALIDA SI EL VALOR DEL FORM ESTA VACIO
            limpiarAlerta(e.target.parentElement);
            comprobarEmail();
            return;
        }
        if(e.target.id === 'CC' && !validarEmail(e.target.value)){
            mostrarAlerta(`El Email es incorrecto`, e.target.parentElement)
            comprobarEmail();
            return
        }
        }

    }
);

