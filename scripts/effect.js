function isVisible(element) {
    let rect = element.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight / 2
    );
}

function setVisible(elements, time) {
    for (let i = 0; i < elements.length; i++) {
        setTimeout(() => {
            elements[i].classList.add('visible');
        }, time * (i + 1));
    }
}

function appearence(div, elements, time) {
    if (isVisible(div)) {
        setVisible(elements, time);
    }
}


document.addEventListener('DOMContentLoaded', () => {

    const about = document.getElementById('about-me');
    const nav = document.getElementById('nav');
    const contacts = document.getElementById('contacts');
    const git = document.getElementById('github');

    const tech = document.getElementsByClassName('tech');
    const navItem = document.getElementsByClassName('nav-item');
    const formGroup = document.getElementsByClassName('form-group');
    
    appearence(nav, navItem, 300);
    appearence(about, tech, 500);

    window.addEventListener('scroll', () => {
        appearence(contacts, formGroup, 300);            
    });
});

