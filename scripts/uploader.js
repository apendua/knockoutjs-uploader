
var FileViewModel = function (file) {
  var self = this;

  self.name     = file.name;
  self.size     = file.size;
  self.status   = ko.observable(null);
  self.link     = ko.observable(null);
  self.progress = ko.observable(0);

  self.showProgress = function () {
    return self.progress() + '% of ' + Math.floor(self.size / 1024) + 'kb';
  };
};

ko.bindingHandlers.uploader = {
  init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    var listOfFiles = ko.observableArray([]);

    // define file upload handler
    var uploadFiles = function (event) {
      var dt = event.originalEvent.dataTransfer;
      if (dt !== undefined && dt.files !== undefined) {
        for (var i=0; i<dt.files.length; i++) {
          (function () {
            var fileViewModel = new FileViewModel(dt.files[i]);
            listOfFiles.push(fileViewModel);
            //-----------------------------------------------
            filepicker.store(dt.files[i], function (fpfile) {
              fileViewModel.status('success');
              fileViewModel.link(fpfile.url);
            }, function (fperror) {
              fileViewModel.status('error');
            }, function (progress) {
              fileViewModel.status('uploading');
              fileViewModel.progress(progress);
            });
          })();
        }
      }
    }

    // apply bindings to child nodes
    var innerBindingContext = bindingContext.extend({
      listOfFiles: listOfFiles,
      uploadFiles: uploadFiles,
    });
    ko.applyBindingsToDescendants(innerBindingContext, element);

    // tell that we're managing bindings of descendants
    return { controlsDescendantBindings: true };
  },

  update: function (element, valueAccessor) {
    // nothing here for now
  },
};
