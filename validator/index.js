exports.userSignupValidator = (req, res, next) => {
    req.check("name", "Name is required").notEmpty();
    req.check("email", "Email must be between 3 to 32 characters")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });
    req.check("password", "Password is required").notEmpty();
    req.check("password")
        .isLength({ min: 6 })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};

exports.questionCreateValidator = (req, res, next) => {
     req.check("question", "question must have a value").isLength({ min: 6 }).withMessage("Question must contain at least 6 characters")
     req.checkBody('options', 'must have at least 2 options').minimum2options();
     if(req.category.answerRequired == true){
       req.checkBody('options', 'Only one option must be defined as correct for trivia typed questions ').triviaVerifyOneCorrectOption();
     }
     const errors = req.validationErrors();
     if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};
