const mongoose = require('mongoose')

formatDate = function() {
    const newDate = new Date();
    let formattedDate = `${ newDate.getFullYear() }-`;
        formattedDate += `${ `0${ newDate.getMonth() + 1 }`.slice(-2) }-`;  // for double digit month
        formattedDate += `${ `0${ newDate.getDate() }`.slice(-2) }`;        // for double digit day
    return formattedDate;
}

console.log(formatDate())
const subtask = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    completedAt: {
        type: String,
        require:true,
        default:formatDate()
    }

})

const TaskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
  
    archive: {
        type: Boolean,
        required: true,
        default: false
    },
    inProgress: {
        type: Boolean,
        required: true,
        default: false
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    subtasks: [subtask],
    createdAt: {
        type: String,
        require:true,
        default: formatDate()
    }



})

module.exports = mongoose.model('Task',TaskSchema)