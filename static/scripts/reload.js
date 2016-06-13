'use strict';


window.reloadShop = function() {

  $.ajax({
    method: 'GET',
    datatype: "json",
    url: location.path,
    data: {single: true},
    success: function(content) {
      $('#content').empty().html(content);
    }
  });

}




