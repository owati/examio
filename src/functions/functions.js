export const API_URL = 'http://127.0.0.1:8000/'

export function error_create_form(data) {     // this verifies the exam creation form
    if (data.students === undefined || (data.students === undefined && data.spec === undefined) || (data.marks === undefined) || (data.time === undefined) ||
        (data.questions === undefined) ||
        (data.dura === undefined) ||
        (data.veri === undefined)) {
        return { error: 'you must answer all the yes-no questions' }
    } else if (data.start_time < new Date()) {
        return { error: 'the date can only be greater that todays date' }
    } else if (data.duration < 300 || data.duration > 18000){
        if(data.duration < 300) return {error: 'time cannot be less 5mins'}
        else return {error: 'time cannot be greater than 5hrs'}
    } else {
        return { error: 'good to go' }

    }

}

export function fill_up(data) {
    for(let i of ['number', 'num_of_students', 'total', 'start', 'duration', 'verification', 'specific']){
        if(data[i] === undefined) {
            data[i] = null
        }
    }
    return data;
}