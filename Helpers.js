const Run = () => {
    const Tasks = require('./Tasks');
    const { task } = getArguments();

    if(!task) {
        console.log(`\nYou need to specify a task to run.`);
        console.log(`Available Tasks:\n`);
        Object.keys(Tasks).filter(t => !(t.indexOf("set") === 0))
        .forEach(task => {
            console.log(` - ${task}`);
        })
        End();
    }

    if(!Tasks[task]) {
        console.log(`Task '${task}' does not exist.`);
        End();
    }

    const job = Tasks[task]();
    if(!job instanceof Promise && !job.then) {
        console.log(job)
        End();
    }

    console.log(`Running ${task}`);
    job.then(() => {
        End();
    })
}

function End(message='') {
    console.log(`${message}\n`);
    process.exit(1);
}

const getArguments = () => process.argv
    .filter(p => p.includes(":"))
    .reduce((a,c) => {
        const [name, value] = c.split(':');
        a[name] = value;
        return a;
    },{});

const toCSVData = (array) => {
    const columns = Object.keys(array[0]);
    return array.map(row => {
        return  columns.map(c => `${row[c].replace(/\"/g,'\"')||""}`).join(", ");
    });
};

const PickA = (array) => array[Math.floor(Math.random()*array.length)];
const rand = n => Math.floor(Math.random()*n);
const randDate = () => Math.floor(Math.random()*1e10) + 1e5;
const futureDate = (from = false) => new Date((from ? Date.parse(from) : Date.now()) + randDate()).toISOString();
const pastDate = (from = false) => new Date((from ? Date.parse(from) : Date.now()) - randDate()).toISOString();

module.exports = {
    Run,
    End,
    getArguments,
    toCSVData,
    PickA,
    pastDate,
    futureDate,
    randDate,
    rand
}