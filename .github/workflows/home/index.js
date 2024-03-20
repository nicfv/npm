const packages = {};

window.addEventListener('load', init);

function init() {
    for (let package in packages) {
        const a = document.createElement('a'),
            h1 = document.createElement('h1'),
            h2a = document.createElement('h2'),
            h2b = document.createElement('h2');
        a.href = '/' + packages[package].dir;
        h1.textContent = package + ' - v' + packages[package].ver;
        h2a.textContent = 'Updated ' + new Date(packages[package].time * 1e3).toDateString();
        h2b.textContent = packages[package].desc;
        a.appendChild(h1);
        a.appendChild(h2a);
        a.appendChild(h2b);
        document.body.appendChild(a);
        console.log(package, packages[package]);
    }
}
