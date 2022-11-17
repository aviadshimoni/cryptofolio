function sendEmail(){
    var name = $('#contactForm :input[name=name]').val();
    var subject = $('#contactForm :input[name=subject]').val();
    var message = $('#contactForm :input[name=message]').val();

    window.open(`mailto:cryptofolio@gmail.com?subject=${subject}&body=${message} %0D%0A ${name}`);
}

var canvas = document.getElementById("namesCanvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle = 'navy';
ctx.font = "20px Verdana";
ctx.fillStyle = "white";
ctx.lineWidth = 4;
ctx.textAlign = "center";
ctx.strokeText("Aviad Shimoni | Tzvika Tubis | Omer Sharon | Moran Eshel ", 350, 20);
ctx.fillText("Aviad Shimoni | Tzvika Tubis | Omer Sharon | Moran Eshel ", 350, 20);
