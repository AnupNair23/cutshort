import mongoose from 'mongoose'
const mongoUrl: string = `mongodb+srv://cutshort:mv1gUecQ5PiXWA4d@database.erxv6k9.mongodb.net/test`
const OPTIONS: Object = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const dbConnect = () => {
    mongoose.connect(mongoUrl, OPTIONS).then(
        () => { console.log('Connection to database successful') },
    ).catch(err => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
        // process.exit();
    });
}

export default dbConnect;