let themeToggler = document.querySelector('.theme-celestial');
let themeStylesheet = document.querySelector('#theme-styles');
let shrinkButton = document.querySelector("#shrink-toggle");
let ringSentences = document.querySelectorAll('.ring-text');
let header = document.querySelector("header");
let headerClassList = header.classList;
let main = document.querySelector("main");
let container3d = document.querySelector('.container-3d');
let scrollbarToggler = false;
let timer = null;

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

document.querySelector('.navbar-toggler').addEventListener('click', function (event) {
    headerClassList.toggle('header-toggler');
    event.stopPropagation();
    document.querySelector('.header-toggler')?.addEventListener('click', function (event) {
        headerClassList.remove('header-toggler');
    }, { once: true });
});

main.addEventListener('scroll', function (event) {
    event.preventDefault();

    if (!scrollbarToggler) {
        toggleScrollbar('inset 0 0 6px var(--secondary-color)', 'solid var(--secondary-color) 2px', 'auto');
        scrollbarToggler = true;
    }

    if (headerClassList.contains('expand-header')) headerClassList.remove('expand-header');
    if (!(headerClassList.contains('roll-header'))) headerClassList.add('roll-header');

    clearTimeout(timer);

    timer = setTimeout(function () {
        toggleScrollbar();
        scrollbarToggler = false;
    }, 1000);
}, false);

shrinkButton.addEventListener('click', function () {
    if (headerClassList.contains('roll-header')) headerClassList.remove('roll-header');
    if (!(headerClassList.contains('expand-header'))) headerClassList.add('expand-header');
}
);

document.addEventListener("DOMContentLoaded", function () {
    if ("IntersectionObserver" in window) {
        let lazyObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting && !entry.target.classList.contains('lazy-loaded')) {
                    entry.target.classList.add('lazy-loaded');
                }
            });
        }, { rootMargin: '-10%' });
        let activateObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'none';
                    entry.target.offsetHeight;
                    entry.target.style.animation = null;
                }
            });
        }, { rootMargin: '-10%' });

        document.querySelectorAll('.lazy-load').forEach(function (element) {
            lazyObserver.observe(element);
        });
        document.querySelectorAll('.activate').forEach(function (element) {
            activateObserver.observe(element);
        });
    }
})

document.querySelectorAll('.hemisphere').forEach((element) => {
    element.style.setProperty('--child-num', `${element.childElementCount}`);
})

orderElements(document.querySelectorAll('.sphere .hemisphere'), '--nth-parent');
orderElements(document.querySelectorAll('.sphere2 .hemisphere'), '--nth-parent');
orderElements(document.querySelectorAll('.show-text:nth-child(n-1)'), '--nth-child');
orderElements(document.querySelectorAll('.sphere .hemisphere:nth-child(1) .skill'), '--nth-child');
orderElements(document.querySelectorAll('.sphere .hemisphere:nth-child(2) .skill'), '--nth-child');
orderElements(document.querySelectorAll('.sphere2 .hemisphere:nth-child(1) .skill'), '--nth-child');
orderElements(document.querySelectorAll('.sphere2 .hemisphere:nth-child(2) .skill'), '--nth-child');


function toggleScrollbar(boxshadow, border, width) {
    document.documentElement.style.setProperty('--scroll-boxshadow', boxshadow || 'none');
    document.documentElement.style.setProperty('--scroll-border', border || 'none');
    document.documentElement.style.setProperty('--scroll-width', width || 'none');
}

function orderElements(elements, variable) {
    elements.forEach((element, index) =>
        element.style.setProperty(variable, `${index}`)
    );
}

document.querySelectorAll(".copy-button").forEach(button => button.addEventListener("click", e => {
    let text = e.target.parentNode.previousElementSibling.innerText;
    navigator.clipboard.writeText(text);
}));

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
