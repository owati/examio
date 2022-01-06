const API_URL = "http://examio.herokuapp.com/" //"http://127.0.0.1:8000/"

export const apiFetch = async function (method = 'GET', endPoint = null, body = {}, destination) {

    try {
        let response = method !== "GET" ? await fetch(API_URL + endPoint, {
            method: method,
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json"                      // to be returned
            }
        }) : await fetch(API_URL +  endPoint)
        destination.status = response.status

        let res = await response.json()
        destination.data = res;
        console.log(destination)
    } catch(error) {
        console.log(error)
    }
}