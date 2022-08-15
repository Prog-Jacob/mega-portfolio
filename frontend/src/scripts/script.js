let slideWithScroll = document.querySelectorAll('.scroll-slide');
let shrinkButton = document.querySelector("#shrink-toggle");
let ringSentences = document.querySelectorAll('.ring-text');
let header = document.querySelector("header");
let headerClassList = header.classList;
let main = document.querySelector("main");
let mainClassList = main.classList;
let timerOne = null;
let timerTwo = null;

document.querySelector('.navbar-toggler').addEventListener('click', function () {
    headerClassList.toggle('header-toggler');
});


for(let i = 0; i < 20; i++) {
    const star = document.createElement('div');

    star.classList.add('star');
    star.setAttribute('style', `
        --star-top: ${Math.floor(Math.random() * 100)}vh;
        --star-left: ${Math.floor(Math.random() * 100)}vw;
        --star-width: ${Math.floor((Math.random() + 1) * 10) / 50}rem;
        --star-color: yellow;
        --star-x: ${Math.floor(Math.random() * 2) * 2 - 1};
        --star-y: ${Math.floor(Math.random() * 2) * 2 - 1};
        --star-speed: ${Math.random() * 3};
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

main.addEventListener('scroll', function () {
    let currentScroll = main.scrollTop;

    transformOnScroll(slideWithScroll, `translate(${-2 * currentScroll}px, ${currentScroll}px)`);
    transformOnScroll(document.querySelectorAll('.water-wave'), `translate(${currentScroll}px, ${currentScroll}px) scale(${1 - currentScroll / 700}`);

    toggleScrollbar('inset 0 0 6px var(--secondary-color)', 'solid var(--secondary-color) 2px', 'auto');
    header.style.visibility = 'visible';
    main.style.visibility = 'visible';

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
    }, 3000);
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


function toggleScrollbar(boxshadow, border, width) {
    document.documentElement.style.setProperty('--scroll-boxshadow', boxshadow || 'none');
    document.documentElement.style.setProperty('--scroll-border', border || 'none');
    document.documentElement.style.setProperty('--scroll-width', width || 'none');
}

function transformOnScroll(parents, value) {
    parents.forEach(element => {
        for (let i = 0; i < element.children.length; i++) {
            let child = element.children[i];
            child.style.transform = value;
            // child.style.setProperty('transform', `rotate(${currentScroll}deg`);
            // child.style.setProperty('transform', `scale(${1 - currentScroll / 500}`);
        }
    });
}