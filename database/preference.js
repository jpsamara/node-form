var db = require('sqlite-sync');

db.connect('sqlite.db'); 

module.exports = {
  all: function () {
    return db.run("SELECT * FROM preferences ");
  },
  clear: function (pfullname) {
    return db.run("DELETE FROM preferences ");
  },
  isExist: function (pfullname) {
    return db.run("SELECT * FROM preferences WHERE fullname = ? ", [pfullname]).length > 0;
  },
  insert: function (pfullname, pcolor, panimal) {
    db.insert('preferences',{ 
      fullname: pfullname,
      color: pcolor,
      animal: panimal
    });
  }
};