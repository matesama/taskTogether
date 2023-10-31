import mongoose from "mongoose";

const TestSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        trim: true

    },
    mail: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100
    }
});


const Test = mongoose.model('Test', TestSchema);

export default Test;