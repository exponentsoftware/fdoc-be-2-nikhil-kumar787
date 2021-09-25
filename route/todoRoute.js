import express from "express";
const router = express.Router();
import {
  getAll,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controller/todoController";

router.route("/").get(getAll);
router.route("/:id").get(getSingleTodo).put(updateTodo).delete(deleteTodo);
router.route("/").post(createTodo);
export default router;
