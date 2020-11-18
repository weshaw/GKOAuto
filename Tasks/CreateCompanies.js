const fs = require('fs');
const { getArguments } = require("../Helpers");
const { file } = getArguments();

const exportPath = process.env["COMPANIES_PATH"];
if(!fs.existsSync(exportPath)) {
    fs.mkdirSync(exportPath);
}
module.exports = () => {
    const f = (file||`${exportPath}/companies`)+".txt";
    if(!fs.existsSync(f)) {
        fs.writeFileSync(f,"");
    }
    return fs.promises.readFile(f, "utf8").then(
    data => data.split("\n")
        .map(l => {
            const line = l.replace(/^[\s+]/gi,'').replace(/[\s+]$/gi,'');
            const dir = `${exportPath}/${line}`;
            console.log(dir);
            if(!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            return line;
        })
    );
}