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