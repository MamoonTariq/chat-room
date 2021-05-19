import mongoose from 'mongoose';

const whatsappScheme = mongoose.Schema({
    message: String,
    name: String,
    timeStamp:  String,
    received: Boolean
})

export default mongoose.model('messagecontents' , whatsappScheme);