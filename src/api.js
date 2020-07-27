import axios from "axios";
const csrf_match = document.cookie.match(/(csrftoken\=)(.+)/);
const csrf = csrf_match ? csrf_match[-1] : '';


// 매번 새로운 오브젝트를 불러와야 함
export const getHeader = (authorization = false) => {
    const header = {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf
    };
    if (authorization) {
        header['Authorization'] = `JWT ${localStorage.getItem('token')}`;
    }
    return header;
};


export const generateQueryParams = (paramsObject) => {
    return Object.keys(paramsObject).map((key) => `${key}=${paramsObject[key]}`).join('&');
};

export const postUserData = (data, params = {}) => {
    console.log(getHeader())
    return axios.post(`/data/subjects/${generateQueryParams(params)}`, data, {headers: getHeader()})
}