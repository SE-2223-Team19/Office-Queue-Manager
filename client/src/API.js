const APIURL = 'http://localhost:3001/';

/**
 * Returns an Array that describes all services available
 * @returns Array
 */
exports.loadServiceTypes = async function loadServiceTypes() {
    const url = APIURL + 'ServicesTypes'
    try {
        const response = await fetch(url)
        if (response.ok) {
            const service_types = await response.json();
            return service_types
        } else {
            const text = await response.text();
            throw new TypeError(text);
        }
    } catch (err) {
        throw err
    }
}
exports.logIn = async function logIn(credentials) {
    const url = APIURL + '/sessions';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });
    if (response.ok) {
        const user = await response.json();
        return user;
    }
    else {
        const errDetails = await response.text();
        throw errDetails;
    }
}

exports.logOut = async function logOut() {
    const url = APIURL + '/sessions/current'
    const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include'
    });
    if (response.ok)
        return null;
}
exports.getUserInfo = async function getUserInfo() {
    const url = APIURL + '/sessions/current';
    const response = await fetch(url, {
        credentials: 'include',
    });
    const user = await response.json();
    if (response.ok) {
        return user;
    } else if (response.status === 401) {
        return null;
    } else {
        throw user;
    }
}