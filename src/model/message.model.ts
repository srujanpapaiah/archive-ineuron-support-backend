import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export const Message = mongoose.model("Message", messageSchema);