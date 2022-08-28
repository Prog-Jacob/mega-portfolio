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

        if (role === 'back') window.history.back();
        else if (role === 'magnify' && mainWidth != 100) maintainWidth(5);
        else if (role === 'minify' && main.offsetWidth > 300) maintainWidth(-5);
        else if (role === 'download') {
            resume.click();
            resume.remove();
        }
    })
})

titles.forEach((title) => {
    title.addEventListener('click', function () {
        const toggleWindow = title.parentElement.querySelector('div:last-child');
        toggleWindow.classList.toggle('toggle-window');
        let condition = toggleWindow.classList.contains('toggle-window');
        let height = parseInt(getComputedStyle(toggleWindow).getPropertyValue('height').replace('px', ''));
        let counter = 0;

        const heightTransition = setInterval(function () {
            if (condition) toggleWindow.style.height = `${height * (1 - 0.05 * (counter + 1))}px`;
            else toggleWindow.style.height = 'auto';

            if (counter === 19) clearInterval(heightTransition);
            counter++;
        }, 10);
    })
})


function maintainWidth(num) {
    const mainWidth = getComputedStyle(main).getPropertyValue('--width');
    main.style.setProperty('--width', `${Number(mainWidth) + num}`);
    main.style.setProperty('--computed-width', main.offsetWidth);
}