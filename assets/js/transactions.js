function edit_click (btn) {
  var tds = $(btn.closest("tr")).children();
  var id = $($(tds[0]).children('span')).text();
  var coin = $($(tds[1]).children('input')[0]).val()
  var amount = $($(tds[2]).children('span')).text();
  var date = $($(tds[3]).children('span')).text();
  $("#editModal :input[name='id']").val(id);
  $("#editModal :input[name='coinId']").val(coin);
  $("#editModal :input[name='amount']").val(amount);
  $("#editModal :input[name='date']").val(new Date(date).toISOString().replace("Z",""));
  $("#update_transaction").attr("action", "/api/transactions/" + id);
};

function clean_modal (btn) {
  $("#createModal :input[name='coinId']").val("");
  $("#createModal :input[name='date']").val("");
  $("#createModal :input[name='amount']").val("");
};
