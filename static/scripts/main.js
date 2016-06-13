
$(function() {
  $('.carousel').carousel({
      interval: 4000 //changes the speed
  });

  $('#loginForm').submit(function() {
    var method = this.method;
    var url = this.action;
    var data = $(this).serialize();

    $.ajax({
      method: method,
      datatype: "json",
      url: url,
      data: data,
      success: function(res) {
        
        if(res == 'true') {
          $('#navbar-admin').show();
          $('#login-button').hide();
          $('#logout-button').show();
          $('#loginModal').modal('hide');
        } else {
          $('#login-error').show();
        }

      }
    });

    return false;
  });
});

function logout() {
  $.ajax({
    method: 'post',
    datatype: "json",
    url: '/logout',
    success: function(res) {
      
      $('#navbar-admin').hide();
      $('#login-button').show();
      $('#logout-button').hide();
    }
  });
}


