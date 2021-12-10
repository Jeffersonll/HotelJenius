const statusElement = document.querySelectorAll('.reserve_status_js');

statusElement.forEach((element) => {

    element.addEventListener('click', async e => {
        const id = e.target.dataset.id;

        const status = e.target.dataset.status;

        let response = await fetch(root+'/adm/room/'+id+'/status', {
            method: 'PUT',
            body: JSON.stringify({status})
        });
        response = await response.json();
        response = await JSON.parse(response);

        const message = document.querySelector('.messages');

        message.innerHTML = '';

        const contentMessage = document.createElement('div');
        contentMessage.classList.add('status-'+response.status);
        contentMessage.innerText = response.message;

        message.appendChild(contentMessage);

        if (status == 'Livre') {
            element.innerText = 'Ocupado';
            e.target.dataset.status = 'Ocupado';
            element.classList.add('bred');
            return;
        }
        element.innerText = 'Livre';
        e.target.dataset.status = 'Livre';
        element.classList.remove('bred');

    })

})
console.log('iu');