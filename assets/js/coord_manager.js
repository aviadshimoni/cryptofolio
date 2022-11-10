function edit_click (btn) {
  var tds = $(btn.closest("tr")).children();
  var id = $(tds[0]).text();
  var locationName = $(tds[1]).text();
  var latitude = $(tds[2]).text()
  var longitude = $(tds[3]).text()
  $("#editModal :input[name='id']").val(id);
  $("#editModal :input[name='locationName']").val(locationName);
  $("#editModal :input[name='latitude']").val(latitude);
  $("#editModal :input[name='longitude']").val(longitude);
  $("#update_coord").attr("action", "/api/coords/" + id);
};

function clean_modal (btn) {
  $("#createModal :input[name='locationName']").val("");
  $("#createModal :input[name='latitude']").val("");
  $("#createModal :input[name='longitude']").val("");
};

function validateForm(form) {
  let formLatitude = form["latitude"].value;
  let formLongitude = form["longitude"].value;
  var trs = $("#coordTable").children();
  for(var i = 0; i < trs.length; i++) {
    var tds = $($(trs[i]).children())
    var latitude = $(tds[2]).text()
    var longitude = $(tds[3]).text()
    if(formLatitude == latitude)
    {
      alert("This latitude already exists!");
      return false;
    }
    if(formLongitude === longitude)
    {
      alert("This longitude already exists!");
      return false;
    }
  }
}


function validatLatitude(input) {
  let formLatitude = $(input).val().toLowerCase();
  var trs = $("#coordTable").children();
  for(var i = 0; i < trs.length; i++) {
    var tds = $($(trs[i]).children())
    var latitude = $(tds[2]).text().toLowerCase()
    var inValied= false;
    if(formLatitude === latitude)
    {
      inValied=true;
      break;
    }
  }
  if(inValied){
    input.setCustomValidity("This latitude already exists!")
    input.reportValidity()
  }else{
    input.setCustomValidity("")
    input.reportValidity()
  }
}

function validatLongitude(input) {
  let formLongitude = $(input).val().toLowerCase();
  var trs = $("#coordTable").children();
  for(var i = 0; i < trs.length; i++) {
    var tds = $($(trs[i]).children())
    var longitude = $(tds[3]).text().toLowerCase()
    var inValied= false;
    if(formLongitude === longitude)
    {
      inValied=true;
      break;
    }
  }
  if(inValied){
    input.setCustomValidity("This longitude already exists!")
    input.reportValidity()
  }else{
    input.setCustomValidity("")
    input.reportValidity()
  }
}
