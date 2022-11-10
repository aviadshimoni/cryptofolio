function edit_click (btn) {
  var tds = $(btn.closest("tr")).children();
  var id = $($(tds[0]).children('span')).text();
  var coin = $($(tds[1]).children('input')[0]).val()
  var amount = $($(tds[2]).children('span')).text();
  var date = $($(tds[3]).children('span')).text();
  $("#editModal :input[name='id']").val(id);
  $("#editModal :input[name='coinId']").val(coin);
  $("#editModal :input[name='amount']").val(amount);
  $("#editModal :input[name='date']").val(toIsoString(new Date(date)));
  $("#update_transaction").attr("action", "/api/transactions/" + id);
};

function clean_modal (btn) {
  $("#createModal :input[name='coinId']").val("");
  $("#createModal :input[name='date']").val("");
  $("#createModal :input[name='amount']").val("");
};

function toIsoString(date) {
      pad = function(num) {
          return (num < 10 ? '0' : '') + num;
      };

  return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes())
}

function validateAmount(input) {
  let amount = $(input).val();
  if(amount <= 0){
    input.setCustomValidity("Amount must be bigger then 0!")
    input.reportValidity()
  }else{
    input.setCustomValidity("")
    input.reportValidity()
  }
}

function validateDate(input) {
  let date = new Date($(input).val()) - new Date($(input).val()).getTimezoneOffset();
  let now = new Date();
  console.log(now)
  if(date > now){
    input.setCustomValidity("Date must be in the past!")
    input.reportValidity()
  }else{
    input.setCustomValidity("")
    input.reportValidity()
  }
}
