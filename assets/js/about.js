function sendEmail(){
    var name = $('#contactForm :input[name=name]').val();
    var subject = $('#contactForm :input[name=subject]').val();
    var message = $('#contactForm :input[name=message]').val();

    window.open(`mailto:cryptofolio@gmail.com?subject=${subject}&body=${message} %0D%0A ${name}`);
}