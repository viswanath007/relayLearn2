// Model types
const data = require('./MOCK_DATA.json');
class User {}
class Widget {}

// Mock data
var viewer = new User();
viewer.id = '1';
viewer.name = 'Anonymous';

var widgets = data.map((obj, i) => {
  var widget = new Widget();
  widget.id = obj.id;
  widget.first_name = obj.first_name;
  widget.last_name = obj.last_name;
  widget.email = obj.email;
  widget.gender = obj.gender;
  widget.ip_address = obj.ip_address;
  // widget.id = `${i}`;
  return widget;
});

module.exports = {
  // Export methods that your schema can use to interact with your database
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  getWidget: (id) => widgets.find(w => w.id === id),
  getWidgets: () => widgets,
  User,
  Widget,
};
