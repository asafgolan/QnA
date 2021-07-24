const express = require("express");
const router = express.Router();
const { questionCreateValidator } = require("../validator");
const {
    categoryById
} = require("../controllers/category");
const {
    create,
    remove,
    questionById,
    read,
    update
} = require("../controllers/question");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/question/:questionId", read);
router.post("/question/create/:categoryId/:userId", requireSignin, isAuth, isAdmin,questionCreateValidator,create);
router.delete(
    "/question/:questionId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.put(
    "/question/:questionId/:answerId",
    update
);

router.param("userId", userById);
router.param("categoryId", categoryById);
router.param("questionId", questionById);

module.exports = router;
