var db = require('sqlite-sync');
db.connect('sqlite.db'); 

db.run("CREATE TABLE IF EXISTS preferences (id       INTEGER PRIMARY KEY AUTOINCREMENT, "  
     + "                                    fullname TEXT NOT NULL,                     "  
     + "                                    color    TEXT NOT NULL,                     "  
     + "                                    animal   TEXT NOT NULL                      "  
     + " )                                                                              "  
);
