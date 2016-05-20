
function changeTheme(obj) {

  var theme = $(obj).data('theme');

  // console.log(theme);
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