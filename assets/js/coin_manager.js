function edit_click (btn) {
  var tds = $(btn.closest("tr")).children();
  var id = $(tds[0]).text();
  var shortName = $(tds[1]).children('span').text()
  var name = $(tds[2]).text()
  var icon = name.toLowerCase()
  $("#editModal :input[name='id']").val(id);
  $("#editModal :input[name='name']").val(name);
  $("#editModal :input[name='shortName']").val(shortName);
  $("#editModal :input[name='icon']").val(icon);
  $("#update_coin").attr("action", "/api/coins/" + id);
};

function edit_name_change (btn) {
  var name = $("#editModal :input[name='name']").val();
  var icon = name.toLowerCase()
  $("#editModal :input[name='icon']").val(icon);
};

function clean_modal (btn) {
  $("#createModal :input[name='name']").val("");
  $("#createModal :input[name='shortName']").val("");
  $("#createModal :input[name='icon']").val("");
};

function validateForm(form) {
  let formShortName = form["shortName"].value.toLowerCase();
  let formName = form["name"].value.toLowerCase();
  var trs = $("#coinTable").children();
  for(var i = 0; i < trs.length; i++) {
    var tds = $($(trs[i]).children())
    var shortName = $(tds[1]).children('span').text().toLowerCase()
    var name = $(tds[2]).text().toLowerCase()
    if(formShortName === shortName)
    {
      alert("This short name already exists!");
      return false;
    }
    if(formName === name)
    {
      alert("This name already exists!");
      return false;
    }
  }
}