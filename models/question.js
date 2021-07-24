const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// });


const questionSchema = new mongoose.Schema(
    {
      question: {
          type: String,
          trim: true,
          required: true,
          //unique: true
      },
      options: [{ option: {type:String, required:true}, count: {type:Number, default: 0}, isCorrect : {type:Boolean}}],
      category: {
            type: ObjectId,
            ref: "Category",
            required: true
      }
    },
    { timestamps: true }
);
questionSchema.index({ "question": 1, "category": 1}, { "unique": true })
module.exports = mongoose.model("Question", questionSchema);
