
var FileViewModel = function (file) {
	var self = this;

	self.fileName = file.name;
	self.fileSize = file.size;
	self.progress = ko.observable(0);

	self.showProgress = function () {
		return self.progress() + '% of ' + Math.floor(self.fileSize / 1024) + 'kb';
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
						var fileViewModel = new FileViewModel(dt.files[i]);
						listOfFiles.push(fileViewModel);
						//-----------------------------------------------
						filepicker.store(dt.files[i], function (fpfile) {
							console.log(fpfile);
						}, function (fperror) {
							console.log(fperror);
						}, function (progress) {
							fileViewModel.progress(progress);
						});
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
