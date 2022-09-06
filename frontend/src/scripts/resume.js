let resume = document.querySelector('.resume-download');
let buttons = document.querySelectorAll('button');
let main = document.querySelector('main');
let titles = document.querySelectorAll('.title')

maintainWidth(0);

window.addEventListener('resize', () => {
    maintainWidth(0);
})

buttons.forEach(button => {
    button.addEventListener('click', function () {
        const mainWidth = getComputedStyle(main).getPropertyValue('--width');
        const role = button.dataset.role;

        if (role === 'magnify' && mainWidth != 100) maintainWidth(5);
        else if (role === 'minify' && main.offsetWidth > 300) maintainWidth(-5);
        else if (role === 'download') {
            resume.click();
            resume.remove();
        }
    })
})

titles.forEach((title) => {
    title.addEventListener('click', function () {
        title.classList.toggle('toggle-window');
    })
})


function maintainWidth(num) {
    const mainWidth = getComputedStyle(document.documentElement).getPropertyValue('--width');
    document.documentElement.style.setProperty('--width', `${Number(mainWidth) + num}`);
    main.style.setProperty('--computed-width', main.offsetWidth);
}