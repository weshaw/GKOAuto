const fs = require("fs");
const d = fs.readdirSync("./Tasks/");

d.forEach(file => {
    if(file.substr(-3) === '.js')
    {
        const name = file.substr(0, file.lastIndexOf("."));
        exports[name] = require(`./Tasks/${name}`);
    }
});
