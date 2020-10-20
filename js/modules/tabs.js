function tabs(tabsSelector, tabsContentSelector, tabsParentSelecor, activeClass) {
    // TABS-slider
    let tabs = document.querySelectorAll(tabsSelector);
    let tabsContent = document.querySelectorAll(tabsContentSelector);
    let tabsParent = document.querySelector(tabsParentSelecor);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }

    hideTabContent();
    showTabContent();
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) { // для передачи значения без точки
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i); /* перебираем табы и если совпадает с кликнутым - вызываем функцию*/
                }

            });
        }
    });
}

export default tabs;