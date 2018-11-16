function createForm(name) {
    return fetch(`http://localhost:5000/forms/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        mode: 'cors',
        body: JSON.stringify(name),
        credentials: 'include',
    })
    .then(response => response.json())
}

function updateForm(formData, formId) {
    console.log(formData.objects.get('1'))
    return fetch(`http://localhost:5000/forms/${formId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(formData),
    }).then(response => response.json());
}

function getForm(formId) {
    return fetch(`http://localhost:5000/forms/${formId}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then(response => response.json());
}

function getForms() {
    return fetch(`http://localhost:5000/forms/`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then(response => response.json());
}

function getResults(formId) {
    return fetch(`http://localhost:5000/results/${formId}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then(response => response.json());
}

export default {
    createForm,
    updateForm,
    getForm,
    getForms,
    getResults,
}
