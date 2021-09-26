//main.js/ send response for click event
const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
    //send put request here
    fetch('/quotes', {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vadar',
            quote: 'I find your lack of faith distributing.'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    //another then to get response from the server
    .then(response => {
        window.location.reload(true)
    })
})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vadar'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then (response => {
        if (response === 'No quote to delete'){
            messageDiv.textContent = 'No Darth Vadar quote to delete'
        } else {
            window.location.reload(true)
        }
    })
    .catch(err => {console.error(err)})
})