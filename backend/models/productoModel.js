import {db} from '../config/db.js';

export const getProductos = (callback) => {
    db.query('SELECT * FROM producto', callback);
};

export const addProducto = (producto, callback) => {
    db.query('INSERT INTO producto SET ?', producto, callback);
};