function createForm(name, date) {
    return fetch(`/api/forms/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        mode: 'cors',
        body: JSON.stringify({name, date}),
        credentials: 'include',
    })
    .then(response => response.json())
}

function updateForm(formData, formId) {
    return fetch(`/api/forms/${formId}`, {
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
    return fetch(`/api/forms/${formId}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then(response => response.json());
}

function getForms() {
    return fetch(`/api/forms/`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then(response => response.json());
}

function getResults(formId) {
    return fetch(`/api/results/${formId}`, {
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
