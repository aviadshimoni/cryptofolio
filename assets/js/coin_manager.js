function edit_click (btn) {
  var tds = $(btn.closest("tr")).children();
  var id = $(tds[0]).text();
  var shortName = $(tds[1]).children('span').text()
  var name = $(tds[2]).text()
  var icon = $(tds[1]).children("img").attr('src')
  $("#editModal :input[name='id']").val(id);
  $("#editModal :input[name='name']").val(name);
  $("#editModal :input[name='shortName']").val(shortName);
  $("#editModal :input[name='icon']").val(icon);
};

function clean_modal (btn) {
  $("#createModal :input[name='name']").val("");
  $("#createModal :input[name='shortName']").val("");
  $("#createModal :input[name='icon']").val("");
};
