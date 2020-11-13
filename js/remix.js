(function() {
    $('form > input').keyup(function() {

        var empty = false;
        $('form > input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        
        if (empty) {
            $('#register').attr('disabled', 'disabled'); // updated according to http://stackoverflow.com/questions/7637790/how-to-remove-disabled-attribute-with-jquery-ie
        } else {
            $('#register').removeAttr('disabled'); // updated according to http://stackoverflow.com/questions/7637790/how-to-remove-disabled-attribute-with-jquery-ie
        }
    });
})()

//https://sech.fm/sechtour?utm_source=community&utm_medium=communitytext

function sendEmail() {
    console.log("sending email");
    var form = document.getElementById("form-body");
    var close= document.getElementById("closet");
    var name= document.getElementById("formname").value;
    var email= document.getElementById("formemail").value;
    var number= document.getElementById("formphone").value;
    var city= document.getElementById("formcity").value;
    var country = document.getElementById("countryField").value;
    var form = document.getElementById("form-body");
    var modalButton = document.getElementById('register');
    var modalTitle = document.getElementById('modal-title');

    $.ajax({
        type: 'post',
        url: 'https://sech.fm/app/create.php',
        data: {
            "name": name,
            "email": email,
            "number": number,
            "city": city,
            "country": country
        },
        success: function( data ) {
                form.innerHTML = "¡You're all signed up!";
                modalButton.style.display = "none";
                close.style.display = "none";
                modalTitle.innerHTML = "";
                setTimeout(function(){ 
                    close.click();
                }, 2000); 
        },
        error: function(data) {
            form.innerHTML = "An Error took place. Please refresh your page and try again.";
            modalButton.style.display = "none";
            close.style.display = "none";
            modalTitle.innerHTML = "";
            console.log(data);
            //close modal
        }
    });
}

function countryCheck() {
    var country = document.getElementById('country');
    var modalButton = document.getElementById('register');
    
    if(country.value === ""){
        modalButton.setAttribute("disabled", "true");
        return;
    } else {
        modalButton.removeAttribute("disabled");
    }
}


function processCommunity() {

    var country = document.getElementById('country');
    var countryForm = document.getElementById('countryPicker');
    var countryField = document.getElementById('countryField');
    var modalContainer = document.getElementById('modal-container');
    var modalTitle = document.getElementById('modal-title');
    var modalButton = document.getElementById('register');
    var modalClose = document.getElementById('closet');
    var modalBody = document.getElementById('form-body');
    var form = document.getElementById('userForm');
    var textButton = document.getElementById('textCommunity');

    if(country.value !== "United States of America"){
        console.log("Not united states");
        countryField.value = country.value;
        modalTitle.innerHTML = "Ingresa tus datos para que estés enterado de las últimas noticias y novedades del Sueños Tour 2020.";
        modalButton.innerHTML = "Enviar";
        modalButton.removeEventListener("click", processCommunity);
        modalButton.addEventListener("click", sendEmail);

        form.style.display = "block";
        modalClose.style.display = "inline-block";
        modalClose.innerHTML = "Cerrar";
        countryForm.style.display = "none";
        modalContainer.classList.add("slide-up");
        modalContainer.classList.remove("top30");
        modalContainer.classList.add("top15");
        
    } else {
        console.log("united states was selected");
        country.style.display = "none";
        modalTitle.innerHTML = "";
        modalButton.style.display = "none";
        // modalBody.style.display = "none";
        modalBody.innerHTML = "Dale clic al botón y envía tu mensaje de texto para que te registre: tendrás acceso a contenido exclusivo, ofertas y regalos, directamente de Sech.";
        textButton.style.display = "block";
    }
}