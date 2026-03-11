const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        content: {
            type: String,
            required: [true, 'Please add content'],
        },
        author: {
            type: String,
            required: [true, 'Please add an author'],
        },
        image: {
            type: String,
        },
        publishDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true, // This automatically adds createdAt and updatedAt
    }
);

module.exports = mongoose.model('Blog', blogSchema);
