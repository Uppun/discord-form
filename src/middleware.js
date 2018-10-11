function createForm(name) {
    return fetch(`http://localhost:5000/forms/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(name),
    })
    .then(response => response.json())
}

function updateForm(formData, formId) {
    return fetch(`http://localhost:5000/forms/${formId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(formData),
    }).then(response => response.json());
}

function getForm(formData, formId) {
    return fetch(`http://localhost:5000/forms/${formId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    }).then(response => response.json());
}

function getForms() {
    return fetch(`http://localhost:5000/forms/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
    }).then(response => response.json());
}

export default {
    createForm,
    updateForm,
    getForm,
    getForms,
}
