knockoutjs-uploader
===================

This very simple project aims at producing an upload file manager
with a help of [KnockoutJS](http://knockoutjs.com/) framework and a minimal amount of code.
At this moment the communication with server is done by a very usefull
[filepicker](https://www.inkfilepicker.com/) library.

knockout-bindings
-----------------
The project contains two custom bindings for `KnockoutJS`.
First of them `droparea`,
see [scripts/droparea.js](https://github.com/apendua/knockoutjs-uploader/blob/master/scripts/droparea.js),
simply makes a DOM element responsive to the `drop` event. It is possible to define the
corresponding callback in the following way
```html
<div data-bind="droparea: { drop: dropCallback }"></div>
```
The second one, named `uploader`
(see see [scripts/droparea.js](https://github.com/apendua/knockoutjs-uploader/blob/master/scripts/uploader.js))
is intended to simplyfy the process of uploading a file. It adds two properties to the context of
its descendants `uploadFile` and `listOfFiles`. The former is pretty strightforward, it takes a `File`
object and it tries to upload it to the server. The latter is a `ko.observableArray` object that
manages the uploading queue. Each element of this array is an object of the following form
```javascript
{
  name: 'fileName',
  size: 1024, // in bytes
  status: ko.observable('success'), // or one of [null, 'error', 'uploading']
  link: ko.observable('http://my.server.com/the-link-to-my-file'),
  progress: ko.observalbe(100),
}
```
which you can use to monitor the uploading process of each separated file.
We also provide a simple example of how to use the bindings described above.
If you're interested, please checkout
[demo.html](https://github.com/apendua/knockoutjs-uploader/blob/master/demo.html)
for further details.
