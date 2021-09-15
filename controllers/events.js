const { response } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const Evento = require('../models/Evento');



const getEventos = async(req, res=response)=>{

    const eventos = await Evento.find().populate('user','name');

    res.json({
        ok:true,
        eventos
    })

}

const crearEvento = async(req, res=response)=>{

    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
         
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

   
    
}

const actualizarEvento = async(req, res=response)=>{

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventId);
        

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese ID'
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorizacion para cambiar el evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventId, nuevoEvento, {new: true});

        res.json({
            ok: true,
            evento: eventoActualizado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

   
    
}

const eliminarEvento = async(req, res=response)=>{
    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventId);
        

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese ID'
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene autorizacion para eliminar el evento'
            })
        }

        

        await Evento.findByIdAndDelete(eventId)

        res.json({
            ok: true,
            msg: "Evento eliminado"
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
    
}

module.exports ={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}