const Question = require("../models/question");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.questionById = (req, res, next, id) => {
    Question.findById(id).exec((err, question) => {
        if (err || !question) {
            return res.status(400).json({
                error: "Question not found"
            });
        }
        req.question = question;
        next();
    });
};

exports.read = (req, res) => {
    return res.json(req.question);
};

exports.create = (req, res) => {
    const question = new Question(req.body);
    question.category = req.category._id ? req.category._id : undefined;
    question.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

exports.remove = (req, res) => {
    let question = req.question;
    question.remove((err, deletedQuestion) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "Question deleted successfully"
        });
    });
};

exports.update = (req, res) => {
   const question = req.question;
   if (req.body.action == "vote"){
     let answerIdValid = false;
     question.options.some(function(obj){
       if (obj._id == req.params.answerId){
          obj.count++;
          answerIdValid = true;
        }
      });
      if(!answerIdValid){
        res.status(400).json({error: "please provide a valid answerId"})
      }
    }else{
     return res.status(400).json({
         error: 'please provide valid action. example : {"action":"vote"}'
      });
    }
    question.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        data.options.some(function(obj){
          if (obj._id == req.params.answerId){
              res.json(obj.count);
          }
        });
    });
};
