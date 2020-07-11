const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);

const user = "";        //db user name
const password = "";    //db user pass
const cluseter = ""     //db cluster name
const db_name = ""      //db name

const url = `mongodb+srv://${user}:${password}@${cluseter}-2mqe5.mongodb.net/${db_name}?retryWrites=true&w=majority`;

mongoose.connect(url,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
);

module.exports = mongoose;
