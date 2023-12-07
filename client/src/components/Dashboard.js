import React, { useState, useEffect } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { fetchdata } from "../hook";
import { puttask, deletetask, postServerData } from "../helper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { IoAddOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import * as Action from "../redux/taskreducer";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  InputLabel,
} from "@mui/material";
export const Dashboard = () => {
  const dispatch = useDispatch();

  const [open, openchange] = useState(false);
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);
  const [newTaskMode, setNewTaskMode] = useState(false); // New task mode indicator
  const [newTask, setNewTask] = useState({
    title: "",
    desc: "",
    catagory: "",
  });

  const functionopenpopup = (index, isNewTask = false) => {
    setNewTaskMode(isNewTask);

    setEditedTaskIndex(index);

    openchange(true);
  };
  const closepopup = () => {
    setEditedTaskIndex(null);
    setNewTaskMode(false);
    setNewTask({
      title: "",
      desc: "",
      catagory: "",
    });

    openchange(false);
  };
  const handleAddNewTaskClick = () => {
    functionopenpopup(null, true);
  };
  const handleAddNewTask = async () => {
    try {
      const response = await postServerData(
        `http://localhost:4000/api/task`,
        newTask
      );
      if (response) {
        setCardsData((prevData) => {
          const updatedData = [...prevData, response];
          return updatedData;
        });
      }
      console.log(response);
      closepopup();
    } catch (error) {
      console.error(error);
    }
  };
  const [cardsData, setCardsData] = useState([]);
  const [completed, setCompleted] = useState([]);
  fetchdata();
  const TASK = useSelector((state) => state.task);
  useEffect(() => {
    setCardsData(TASK.queue);
    setCompleted(TASK.queue.map((card) => card.finished));
  }, [TASK]);
  const handleClick = async (index) => {
    const updatedCompleted = [...completed];
    updatedCompleted[index] = !completed[index];
    let id = cardsData[index].id;
    let state = !completed[index];
    console.log(updatedCompleted);
    const task = await puttask(`http://localhost:4000/api/task/${id}`, {
      finished: state,
    });
    if (task) {
      setCompleted(updatedCompleted);
    }
  };

  const handleEditClick = (index) => {
    functionopenpopup(index);
  };
  const handleTextFieldChange = (event, field) => {
    const updatedCardsData = [...cardsData];
    updatedCardsData[editedTaskIndex] = {
      ...updatedCardsData[editedTaskIndex],
      [field]: event.target.value,
    };
    setCardsData(updatedCardsData);
  };

  const handleUpdateTask = async () => {
    try {
      const updatedTask = cardsData[editedTaskIndex];
      const response = await puttask(
        `http://localhost:4000/api/task/${updatedTask.id}`,
        updatedTask
      );
      let task = cardsData;
      if (response) {
        dispatch(Action.loaddata({ task }));
        console.log(response);
        closepopup();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (index) => {
    try {
      console.log(cardsData);
      const idToDelete = cardsData[index].id;

      const response = await deletetask(
        `http://localhost:4000/api/task/${idToDelete}`
      );
      if (response) {
        console.log(response);
        const updatedCardsData = cardsData.filter((_, i) => i !== index);
        setCardsData(updatedCardsData);
        let task = updatedCardsData;
        dispatch(Action.loaddata({ task }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleTextFieldChange2 = (event, field) => {
    console.log(event.target.value);
    setNewTask({
      ...newTask,
      [field]: event.target.value,
    });
  };

  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to show all items
  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;
    setSelectedCategory(categoryValue);

    // Filter items based on the selected category
    if (categoryValue === "All") {
      setCardsData(TASK.queue);
    } else {
      const filtered = TASK.queue.filter(
        (item) => item.catagory === categoryValue
      );
      setCardsData(filtered);
    }
  };
  return (
    <div className="container my-6 w-full">
      <div className="container my-6 w-full">
        <div className="containe ">
          <div class="flex justify-between">
            <select
              id="category"
              onChange={handleCategoryChange}
              value={selectedCategory}
              style={{
                padding: "8px",
                fontSize: "16px",
                borderRadius: "5px",
                background: "#57585",
                margin: "5px",
                cursor: "pointer",
                outline: "none",
              }}
            >
              <option value="All">All</option>
              <option value="shop">shop</option>
              <option value="personal">personal</option>
              <option value="work">work</option>
            </select>{" "}
            <div className="add-new-button " onClick={handleAddNewTaskClick}>
              <IoAddOutline className="add-new-icon " />
            </div>
          </div>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {cardsData.map((card, index) => (
              <Grid item xs={8} md={6} lg={3} key={index}>
                <Card
                  sx={{
                    maxWidth: 400,
                    backgroundColor: "#292929",
                    position: "relative",
                  }}
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ color: "#ffffff" }}
                    >
                      {card.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ffffff" }}>
                      {card.desc}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#ffffff", padding: "16px 0 16px 0" }}
                    >
                      {card.catagory}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#ffffff",
                        position: "absolute",
                        bottom: 40,
                      }}
                    >
                      22-4-2022
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      sx={{
                        color: completed[index] ? "#ff5555" : "#55ff55",
                        boxShadow: !completed[index]
                          ? "2px 2px 5px rgba(60, 192, 86, 0.5)"
                          : "2px 2px 5px rgba(208, 58, 28, 0.5)",
                      }}
                      size="small"
                      onClick={() => handleClick(index)}
                    >
                      {completed[index] ? "Incomplete" : "Completed"}
                    </Button>
                    <div className="absolute bottom-0 right-1 space-x-2">
                      <button onClick={(x) => handleEditClick(index)}>
                        <AiOutlineEdit size={24} color="#d8d0d0" />
                      </button>
                      <button onClick={(x) => handleDeleteTask(index)}>
                        <AiOutlineDelete size={24} color="#d8d0d0" />
                      </button>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={closepopup}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            backgroundColor: "#1e1e1e",
            color: "#ffffff",
          },
        }}
      >
        <DialogTitle>
          {newTaskMode ? "add new task" : " Update Task"}

          <IconButton
            onClick={closepopup}
            sx={{
              float: "right",
              color: "#ffffff",
            }}
          >
            <RiCloseLine color="primary" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <InputLabel
              htmlFor="title"
              sx={{
                color: "#ffffff",
              }}
            >
              title
            </InputLabel>

            <TextField
              variant="outlined"
              value={
                editedTaskIndex !== null
                  ? cardsData[editedTaskIndex].title
                  : null
              }
              onChange={(event) => {
                if (newTaskMode) {
                  handleTextFieldChange2(event, "title");
                } else {
                  handleTextFieldChange(event, "title");
                }
              }}
              sx={{
                backgroundColor: "#141414", // Background color
                borderRadius: "10px", // Adjust the value for the desired roundness
              }}
              inputProps={{
                style: {
                  color: "#bab7b3",
                },
              }}
            />
            <InputLabel
              htmlFor="desc"
              sx={{
                color: "#ffffff",
              }}
            >
              Description
            </InputLabel>

            <TextField
              multiline
              rows={2}
              variant="outlined"
              value={
                editedTaskIndex !== null
                  ? cardsData[editedTaskIndex].desc
                  : null
              }
              onChange={(event) => {
                if (newTaskMode) {
                  handleTextFieldChange2(event, "desc");
                } else {
                  handleTextFieldChange(event, "desc");
                }
              }}
              sx={{
                backgroundColor: "#141414", // Background color
                borderRadius: "10px", // Adjust the value for the desired roundness
              }}
              inputProps={{
                style: {
                  color: "#bab7b3",
                },
              }}
            />
            <InputLabel
              htmlFor="catagory"
              sx={{
                color: "#ffffff",
              }}
            >
              catagory
            </InputLabel>

            <TextField
              variant="outlined"
              value={
                editedTaskIndex !== null
                  ? cardsData[editedTaskIndex].catagory
                  : null
              }
              onChange={(event) => {
                if (newTaskMode) {
                  handleTextFieldChange2(event, "catagory");
                } else {
                  handleTextFieldChange(event, "catagory");
                }
              }}
              sx={{
                backgroundColor: "#141414", // Background color
                borderRadius: "10px", // Adjust the value for the desired roundness
              }}
              inputProps={{
                style: {
                  color: "#bab7b3",
                },
              }}
            />
            <Button
              className=""
              variant="contained"
              onClick={newTaskMode ? handleAddNewTask : handleUpdateTask}
              sx={{
                backgroundColor: newTaskMode ? "#4caf50" : "#4caf50",
              }}
            >
              {newTaskMode ? "Submit" : "Update"}
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};
