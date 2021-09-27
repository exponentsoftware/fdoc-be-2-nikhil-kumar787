import express from "express";
const router = express.Router();
import {
  getAll,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodos,
} from "../controller/todoController";
import { protectAdmin } from "../middlewares/adminMiddleware";
import { protectUser } from "../middlewares/userMiddleware";

router.route("/").get(getAll);
router.route("/user").get(getTodos);
router
  .route("/:id")
  .get(getSingleTodo)
  .put(protectUser, updateTodo)
  .delete(protectUser, deleteTodo);
router.route("/").post(protectUser, createTodo);
export default router;
