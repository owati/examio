const API_URL = "http://127.0.0.1:8000/"

export const apiFetch = async function (method = 'GET', endPoint = null, body = {}, destination) {
    try {
        let response = await fetch(API_URL + endPoint, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json"                      // to be returned
            }
        })
        let status = response.status

        let res = await response.json()

        destination = {
            status : status,
            data : res
        }

    } catch {
        return Error("Cant fetch request,,")
    }
}