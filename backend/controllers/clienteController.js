import { getClientes, addCliente} from '../models/clienteModel.js';

export const obtenerClientes = async (req, res) => {
getClientes((err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los clientes' });
    res.json(resultados);
});

};
export const crearCliente=(req , res) =>{
    const cliente = req.body;
    addCliente(cliente, (err, resultado) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({mensaje: 'Cliente creado' ,id: resultado.insertId});
    });
};
