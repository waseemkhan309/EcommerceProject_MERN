import mongoose from 'mongoose';

const connectiondb = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDb successfully connected with server ${conn.connection.host}`)
    }catch(e){
        console.log(`error in mongoDb connection ${e}`)
    }
}

export default connectiondb;