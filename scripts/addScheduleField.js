document.querySelector('#add-time').addEventListener('click', cloneScheduleField);

function cloneScheduleField() {
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true);
    const fields = newFieldContainer.querySelectorAll('input');
    fields.forEach(element => {
        element.value = '';
    });
    document.querySelector('#schedule-items').appendChild(newFieldContainer);
}
