// let slideWithScroll = document.querySelectorAll('.scroll-slide > *');
let themeToggler = document.querySelector('.theme-celestial');
let themeStylesheet = document.querySelector('#theme-styles');
let shrinkButton = document.querySelector("#shrink-toggle");
let ringSentences = document.querySelectorAll('.ring-text');
let header = document.querySelector("header");
let headerClassList = header.classList;
let main = document.querySelector("main");
let mainClassList = main.classList;
let timerOne = null;
let timerTwo = null;

let theme = localStorage.getItem('theme');
if (theme == null) {
    window.matchMedia("(prefers-color-scheme: dark)").matches ? setTheme("default") : setTheme("light");
} else setTheme(theme);

for (let i = 0; i < 25; i++) {
    const star = document.createElement('div');

    star.classList.add('star');
    star.setAttribute('style', `
        --star-top: ${Math.floor(Math.random() * 100)}vh;
        --star-left: ${Math.floor(Math.random() * 100)}vw;
        --star-width: ${Math.floor((Math.random() + 1) * 10) / 50}rem;
        --star-x: ${Math.floor(Math.random() * 2) * 2 - 1};
        --star-y: ${Math.floor(Math.random() * 2) * 2 - 1};
        --star-speed: ${120 / (0.1 + Math.random() * .5)}s;
        opacity: ${Math.random() * 0.7};
    `)

    document.documentElement.appendChild(star);
}

ringSentences.forEach(element => {
    let sentence = element.innerHTML;
    let newSentence = "";
    let word = "";
    let tag = "";

    [...sentence].forEach(letter => {
        if (letter === " ") {
            if (word) {
                newSentence += `<span class="inline-block">${word}&nbsp;</span>`;
                word = "";
            }
        } else if (letter === "<") {
            if (word) {
                newSentence += `<span class="inline-block">${word}</span>`;
                word = "";
            }
            tag += letter;
        } else if (letter === ">") {
            tag += letter;
            newSentence += tag;
            tag = "";
        } else {
            if (tag) tag += letter;
            else word += `<span class="ring-letter">${letter}</span>`;
        }
    });

    if (word) newSentence += `<span class="inline-block">${word}</span>`;
    element.innerHTML = newSentence;
})

themeToggler.addEventListener('click', function () {
    setTheme(this.dataset.theme);
})

document.querySelector('.navbar-toggler').addEventListener('click', function () {
    headerClassList.toggle('header-toggler');
});

document.querySelectorAll('.hemisphere').forEach((hemisphere) => {
    let container3d = document.querySelector('.container-3d');
    let resetRotation = null;

    hemisphere.addEventListener('click', () => {
        clearTimeout(resetRotation);
        let nthParent = Number(getComputedStyle(hemisphere)
            .getPropertyValue('--nth-parent'));
        let rotationNum = Number(getComputedStyle(container3d)
            .getPropertyValue('--rotate-on-click'));
        rotationNum = (nthParent * -2 + 1) * 20 + rotationNum;

        container3d.setAttribute('style', `
                --rotate-on-click: ${rotationNum};
                transition: transform ${Math.abs(rotationNum) * 50}ms linear;
            `);

        resetRotation = setTimeout(function () {
            container3d.setAttribute('style', `
                --rotate-on-click: 0;
                transition: transform ${Math.abs(rotationNum) * 50}ms linear;
            `);
        }, Math.abs(rotationNum) * 50)
    });
});

if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mouseup', function (event) {
        const bullet = document.createElement('div');

        bullet.classList.add('bullet');
        bullet.setAttribute('style', `
        top: ${event.clientY}px;
        left: ${event.clientX}px;
        --h-distance: -${event.clientX}px;
        --v-distance: -${event.clientX * Math.tan(40 * Math.PI / 180)}px;
        --bullet-timing: ${event.clientX}ms;
        `)

        document.documentElement.appendChild(bullet);
        setTimeout(function () {
            bullet.remove();
        }, 4000)
    })
}

main.addEventListener('scroll', function (event) {
    event.preventDefault();
    
    toggleScrollbar('inset 0 0 6px var(--secondary-color)', 'solid var(--secondary-color) 2px', 'auto');

    if (timerTwo == null) {
        if (headerClassList.contains('expand-header')) headerClassList.remove('expand-header');
        header.offsetWidth;
        if (!(headerClassList.contains('roll-header'))) headerClassList.add('roll-header');

        if (mainClassList.contains('shrink-view')) mainClassList.remove('shrink-view');
        main.offsetWidth;
        if (!(mainClassList.contains('expand-view'))) mainClassList.add('expand-view');
    }

    if (timerOne !== null) clearTimeout(timerOne);

    timerOne = setTimeout(function () {
        toggleScrollbar();
    }, 2000);
}, false);

shrinkButton.addEventListener('click', function () {
    toggleScrollbar('inset 0 0 6px var(--secondary-color)', 'solid var(--secondary-color) 2px', 'auto');
    timerTwo = setTimeout(function () {
        toggleScrollbar();
        timerTwo = null;
    }, 2000);

    if (mainClassList.contains('expand-view')) mainClassList.remove('expand-view');
    main.offsetWidth;
    if (!(mainClassList.contains('shrink-view'))) mainClassList.add('shrink-view');

    if (headerClassList.contains('roll-header')) headerClassList.remove('roll-header');
    header.offsetWidth;
    if (!(headerClassList.contains('expand-header'))) headerClassList.add('expand-header');
}
);

document.querySelectorAll('.hemisphere').forEach((element) => {
    element.style.setProperty('--child-num', `${element.childElementCount}`);
})

orderElements(document.querySelectorAll('.show-text:nth-child(n-1)'), '--nth-child');
orderElements(document.querySelectorAll('.hemisphere'), '--nth-parent');
orderElements(document.querySelectorAll('.hemisphere:nth-child(1) .skill'), '--nth-child');
orderElements(document.querySelectorAll('.hemisphere:nth-child(2) .skill'), '--nth-child');


function toggleScrollbar(boxshadow, border, width) {
    document.documentElement.style.setProperty('--scroll-boxshadow', boxshadow || 'none');
    document.documentElement.style.setProperty('--scroll-border', border || 'none');
    document.documentElement.style.setProperty('--scroll-width', width || 'none');
}

// function transformOnScroll(parents, value) {
//     parents.forEach(element => {
//         element.style.transform = value;
//     });
// }

function orderElements(elements, variable) {
    elements.forEach((element, index) =>
        element.style.setProperty(variable, `${index}`)
    );
}

function setTheme(theme) {
    if (theme === 'default') {
        themeStylesheet.href = 'styles/light.css';
        document
            .querySelector('meta[name="theme_color"]')
            .setAttribute("content", "#11223E");
        document
            .querySelector('meta[name="msapplication-TileColor"]')
            .setAttribute("content", "#11223E");
        document
            .querySelector('meta[name="msapplication-navbutton-color"]')
            .setAttribute("content", "#11223E");
        document
            .querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
            .setAttribute("content", "#11223E");
        themeToggler.dataset.theme = 'light';
    } else {
        themeStylesheet.href = '#';
        document
            .querySelector('meta[name="theme_color"]')
            .setAttribute("content", "#F7ECDE");
        document
            .querySelector('meta[name="msapplication-TileColor"]')
            .setAttribute("content", "#F7ECDE");
        document
            .querySelector('meta[name="msapplication-navbutton-color"]')
            .setAttribute("content", "#F7ECDE");
        document
            .querySelector('meta[name="apple-mobile-web-app-status-bar-style"]')
            .setAttribute("content", "#F7ECDE");
        themeToggler.dataset.theme = 'default';
    }

    localStorage.setItem('theme', theme);
}
