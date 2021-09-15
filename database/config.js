const mongoose = require('mongoose');

const dbConection =async()=>{
    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('Db online')
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar la base de datos')
    }
}

module.exports ={
    dbConection
}