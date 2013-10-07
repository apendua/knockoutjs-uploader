
ko.bindingHandlers.droparea = {

  init: function (element, valueAccessor) {
    var currentValue = valueAccessor();
    $(element)
      .on('dragenter', function (event) {
        //-------------------------------
        $(this).addClass('dragover');
        event.preventDefault();
        return false;
      }).on('dragover', function (event) {
        //--------------------------------
        event.preventDefault();
        return false;
      }).on('dragleave', function (event) {
        //---------------------------------
        $(this).removeClass('dragover');
      }).on('drop', function (event) {
        //----------------------------------
        if (currentValue.drop !== undefined)
          currentValue.drop(event);
        // restore style
        $(this).removeClass('dragover');
        event.preventDefault(); // I'm not sure if this is required
        return false;
      });
  },

};
