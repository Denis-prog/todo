import { CONSTANTS } from '../shared/index';

const {
    createUserUrl,
    getAllDataUrl,
    addColumnUrl,
    deleteColumnUrl,
    updateColumnUrl,
    addNoteUrl,
    updateNoteUrl,
    deleteNoteUrl,
} = CONSTANTS.request_url;

export const createUser = (dataObj) => new Promise((resolve, reject) => {
    $.ajax({
        url: createUserUrl,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(dataObj, (key, value) => {
            if (typeof value === 'undefined') {
                return null;
            }

            return value;
        }),
        contentType: 'application/json',
        success: (data) => resolve(data),
        error: (req, status, err) => reject({ req, status, err }),
    });
});

export const checkAuth = (authorization) => new Promise((resolve, reject) => {
    $.ajax({
        headers: { Authorization: authorization },
        url: 'http://localhost:4000/checkAuth',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        success: () => resolve(authorization),
        error: (req, status, err) => reject({ req, status, err }),
    });
});


export const getAllData = (authorization) => $.ajax({
    headers: { Authorization: authorization },
    url: getAllDataUrl,
    method: 'GET',
    dataType: 'json',
});

export const addColumnApi = (authorization, dataObj) => new Promise((resolve, reject) => {
    $.ajax({
        headers: { Authorization: authorization },
        url: addColumnUrl,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(dataObj, (key, value) => {
            if (typeof value === 'undefined') {
                return null;
            }
            return value;
        }),
        contentType: 'application/json',
        success: (data) => resolve(data),
        error: (req, status, err) => reject({ req, status, err }),
    });
});

export const updateColumnApi = (authorization, id, dataObj) => new Promise((resolve, reject) => {
    $.ajax({
        headers: { Authorization: authorization },
        url: `${updateColumnUrl}${id}`,
        method: 'PUT',
        dataType: 'json',
        data: JSON.stringify(dataObj, (key, value) => {
            if (typeof value === 'undefined') {
                return null;
            }
            return value;
        }),
        contentType: 'application/json',
        success: (data) => resolve(data),
        error: (req, status, err) => reject({ req, status, err }),
    });
});

export const deleteColumnApi = (authorization, id) => new Promise((resolve, reject) => {
    $.ajax({
        headers: { Authorization: authorization },
        url: `${deleteColumnUrl}${id}`,
        method: 'DELETE',
        dataType: 'json',
        success: (data) => resolve(data),
        error: (req, status, err) => reject({ req, status, err }),
    });
});


export const addNoteApi = (authorization, dataObj) => new Promise((resolve, reject) => {
    $.ajax({
        headers: { Authorization: authorization },
        url: addNoteUrl,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(dataObj, (key, value) => {
            if (typeof value === 'undefined') {
                return null;
            }
            return value;
        }),
        contentType: 'application/json',
        success: (data) => resolve(data),
        error: (req, status, err) => reject({ req, status, err }),
    });
});

export const updateNoteApi = (authorization, id, dataObj) => new Promise((resolve, reject) => {
    $.ajax({
        headers: { Authorization: authorization },
        url: `${updateNoteUrl}${id}`,
        method: 'PUT',
        dataType: 'json',
        data: JSON.stringify(dataObj, (key, value) => {
            if (typeof value === 'undefined') {
                return null;
            }
            return value;
        }),
        contentType: 'application/json',
        success: (data) => resolve(data),
        error: (req, status, err) => reject({ req, status, err }),
    });
});

export const deleteNoteApi = (authorization, id) => new Promise((resolve, reject) => {
    $.ajax({
        headers: { Authorization: authorization },
        url: `${deleteNoteUrl}${id}`,
        method: 'DELETE',
        dataType: 'json',
        success: (data) => resolve(data),
        error: (req, status, err) => reject({ req, status, err }),
    });
});
/*
export const getData = (id) => $.ajax({
    url: `${GET_ITEM_LINK}${id}`,
    method: 'GET',
    dataType: 'json',
});

export const setData = (dataObj) => new Promise((resolve, reject) => {
    $.ajax({
        url: POST_LINK,
        method: 'POST',
        dataType: 'json',
        data: JSON.stringify(dataObj, (key, value) => {
            if (typeof value === 'undefined') {
                return null;
            }

            return value;
        }),
        contentType: 'application/json',
        success: (data) => resolve(data),
        error: (req, status, err) => reject({ req, status, err }),
    });
});

export const updateData = (id, dataObj) => new Promise((resolve, reject) => {
    $.ajax({
        url: `${PUT_LINK}${id}`,
        method: 'PUT',
        dataType: 'json',
        data: JSON.stringify(dataObj, (key, value) => {
            if (typeof value === 'undefined') {
                return null;
            }
            return value;
        }),
        contentType: 'application/json',
        success: (data) => resolve(data),
        error: (req, status, err) => reject({ req, status, err }),
    });
});

export const deleteData = (id) => new Promise((resolve, reject) => {
    $.ajax({
        url: `${DELETE_LINK}${id}`,
        method: 'DELETE',
        dataType: 'json',
        success: (data) => resolve(data),
        error: (req, status, err) => reject({ req, status, err }),
    });
});  */
