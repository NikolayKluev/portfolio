// Данные о проектах 
const projects = [
    {
        id: 1,
        images: ['images/yasenevo-1.png', 'images/yasenevo-2.png', './images/yasenevo-3.png', './images/yasenevo-4.png', './images/yasenevo-5.png', './images/yasenevo-6.png'],
        description: 'Верстка сайта по макету, произведена адаптация под мобильные устройства, есть анимации',
        link: '/projects/yasenevo/index.html',  // 
        gitLink: 'https://github.com/NikolayKluev/p-03.git'
    },
    {
        id: 2,
        images: ['images/bootstrap-1.png'],
        description: 'Дополнения к стартовой странице Bootstrap',
        link: '/projects/bootstrap/index.html',
        gitLink: 'https://github.com/NikolayKluev/bootstrap.git'
    },
    {
        id: 3,
        images: ['images/todolist-1.png', 'images/todolist-2.png', 'images/todolist-3.png', 'images/todolist-4.png', 'images/todolist-5.png'],
        description: 'Kanban-доска для управления задачами, созданная с использованием react, react router dom, @dnd-kit/core + @dnd-kit/sortable, scss',
        link: '',
        gitLink: 'https://github.com/NikolayKluev/todo-list-react.git'
    },
    {
        id: 4,
        images: ['images/weather-1.png', 'images/weather-2.png', 'images/weather-3.png'],
        description: 'Приложение для отображения погоды на react с использованием typescript, react router dom, react bootstrap',
        link: '',
        gitLink: 'https://github.com/NikolayKluev/weather-react-ts.git'
    }
];

const linkDiv = document.getElementById('link-div');

// Функция открытия модального окна
function openModal(projectId) {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    // Находим проект по ID
    const project = projects.find(p => p.id === projectId);

    // Заполняем слайдер изображениями проекта
    const modalSlider = document.querySelector('.modal-slider');
    modalSlider.innerHTML = '';
    project.images.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img;
        modalSlider.appendChild(imgElement);
    });

    // блок описания проекта
    const modalDescription = document.querySelector('.modal-description');
    modalDescription.innerHTML = project.description;

    // ссылка на проект, если есть
    if (project.link) {
        linkDiv.style.display = 'block';
        let a = linkDiv.querySelector('a');
        if (!a) {
            a = document.createElement('a');
            a.target = '_blank';
            linkDiv.appendChild(a);
        }
        a.href = project.link;
        a.textContent = 'Перейти к проекту';
    } else {
        linkDiv.style.display = 'none';
    }

    // GitHub
    document.getElementById('gitLink').href = project.gitLink;
}

// Функция закрытия модального окна
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Закрытие модального окна при клике вне его
window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
