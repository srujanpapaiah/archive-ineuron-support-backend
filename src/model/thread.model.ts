import mongoose from "mongoose";

const threadSchema = new mongoose.Schema({
    users: {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }]
},
{
    timestamps: true
}
);

export const Thread = mongoose.model("Thread", threadSchema);