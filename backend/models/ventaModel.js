import { db } from '../config/db.js';

export const registrarVenta = (venta, callback) => {
    const { clienteId, productoId, cantidad } = venta;
    db.query('select precio, stock from producto where id = ?', [productoId], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) return callback(new Error('Producto no encontrado'));

        const { precio, stock } = results[0];
        if (cantidad > stock) {
            return callback(new Error('Stock insuficiente'));
        }
        const total = precio * cantidad;
        db.query(
            'insert into ventas(id_cliente, id_producto, cantidad, precio_unitario, total) values(?,?,?,?,?)',
            [clienteId, productoId, cantidad, precio, total],
            (err, resultado) => {
                if (err) return callback(err);
                db.query(
                    'update producto set stock = stock - ? where id = ?',
                    [cantidad, productoId],
                    (err2) => {
                        if (err2) return callback(err2);
                        return callback(null, resultado);
                    }
                );
            }
        );
    });
};

export const obtenerVentas = (callback) => {
    db.query(
        `select v.id, c.nombre as cliente, p.nombre as producto, v.cantidad, v.precio_unitario, v.total, v.fecha 
        from ventas v
        join cliente c on v.id_cliente = c.id
        join producto p on v.id_producto = p.id
        order by v.fecha desc
        `,
        (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
};