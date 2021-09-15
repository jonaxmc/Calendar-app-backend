const { Router } = require('express');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');


//Todas las peticiones tienen que pasar por validarJWT
router.use(validarJWT);

// Obtener eventos
router.get(
    '/',
    getEventos)

//Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio es obligatoria').custom(isDate),
        check('end', 'Fecha finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],  
    crearEvento)

//Actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio es obligatoria').custom(isDate),
        check('end', 'Fecha finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    actualizarEvento)

//Borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router;