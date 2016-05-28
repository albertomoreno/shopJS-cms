
$(function() {

  $('#categoryForm').submit(function() {
    var method = this.method;
    var url = this.action;
    var data = $(this).serialize();

    $.ajax({
      method: method,
      datatype: "json",
      url: url,
      data: data,
      success: function(res) {

        console.log(res);
        
        /*if(res == 'true') {
          $('#navbar-admin').show();
          $('#login-button').hide();
          $('#logout-button').show();
          $('#loginModal').modal('hide');
        } else {
          $('#login-error').show();
        }*/

      }
    });

    return false;

  });

});


function changeTheme(obj) {

  var theme = $(obj).data('theme');

  $.ajax({
    method: 'get',
    datatype: "json",
    url: '/cambiar-tema',
    data: {theme: theme},
    success: function(res) {
      
      location.href = '/';
    }
  });

}

function updateCategory() {

  var url = $('#categoryForm').attr('action');
  var method = $('#categoryForm').attr('method');
  var data = $('#categoryForm').serialize();

  $.ajax({
    method: method,
    datatype: "json",
    url: url,
    data: data,
    success: function(res) {

      var res = JSON.parse(res);

      if(res.result) {
        $('#admin-navbar').html(res.message);
        $('#categoryModal').modal('hide');
      } else {
        $('#category-error').text(res.message);
        $('#category-error').show();
      }
    }
  });
}

function createCategory(obj) {

  var parent = $(obj).data('parent');

  $.ajax({
    method: 'get',
    datatype: "json",
    url: '/crear-categoria',
    data: {parent: parent},
    success: function(res) {
      
      $('#categoryModal .modal-body').html(res);

      $('#categoryModal').modal('show');
    }
  });
}
