import Todo from "../model/todoModel";
import asyncHandler from "express-async-handler";
import ErrorHandler from "../utils/errorHandler";
import APIFeatures from "../utils/apiFeatures";

const getAll = asyncHandler(async (req, res) => {
  // const todo = await Todo.find();
  const todo = await Todo.find().sort({ createdAt: -1 });

  ///////////////// check if todo data is available or not//////////////////////////////
  if (todo.length == 0) {
    res.status(404).json({
      success: false,
      message: `Not Found any Todo Data`,
      todo,
    });
  }

  let key = "";
  for (let k in req.query) {
    key = k;
  }

  if (req.query[key]) {
    req.query[key] == "true" ? (req.query[key] = true) : "";
    req.query[key] == "false" ? (req.query[key] = false) : "";

    ///////////////// if it has query then fillter by given key//////////////////////////////
    ///////////////// // route ex http://localhost:3000/todo/?status=true   ////////////////////

    const response = await todo.filter((ele) => {
      return ele[key] == req.query[key];
    });
    ///////////////// chcke filterd data found or Not//////////////////////////////
    if (response.length <= 0) {
      res.status(404).json({
        success: false,
        message: `Not Found ${key} of Todo`,
        todo: response,
      });
    }
    ///////////////// Filterd data response//////////////////////////////
    res
      .status(200)
      .json({ success: true, message: `All ${key} of Todo`, todo: response });
  } else {
    ///////////////// respose all todo whithout filtering route (/)//////////////////////////////

    res.status(200).json({ success: true, message: "All Todo", todo });
  }
});

const getSingleTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorHandler("Todo not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    todo,
  });
});

const createTodo = asyncHandler(async (req, res, next) => {
  const { username, title, category } = req.body;

  if (!username || !title || !category) {
    return next(new ErrorHandler("Please enter the appropriate fields", 400));
  } else {
    const todo = new Todo({ username, title, category });

    const createdTodo = await todo.save();

    res.status(201).json(createdTodo);
  }
});

const updateTodo = asyncHandler(async (req, res, next) => {
  let todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorHandler("Todo not found with this id", 404));
  }

  todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    todo,
  });
});

const deleteTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return next(new ErrorHandler("Todo not found with this id", 404));
  }

  await todo.remove();

  res.status(200).json({
    success: true,
    message: "Todo is deleted",
  });
});

export { getAll, getSingleTodo, createTodo, updateTodo, deleteTodo };
