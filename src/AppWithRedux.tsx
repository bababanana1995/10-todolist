import React from 'react';
import './App.css';
import {TaskType} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import {Menu} from "@mui/icons-material";
import {addTodolistAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./TodolistWidthRedux";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
function AppWidthRedux() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let todolists= useSelector<AppRootStateType,TodolistType[]>(state => state.todolists)
    //
    let dispatch = useDispatch()
    // function addTask(title: string, todolistId: string) {
    //     dispatch(addTaskAC(title, todolistId))
    // }
    // function removeTask(id: string, todolistId: string) {
    //     dispatch(removeTaskAC(id, todolistId))
    // }
    // function changeStatus(id: string, isDone: boolean, todolistId: string) {
    //     dispatch(changeTaskStatusAC(id, isDone, todolistId))
    // }
    // function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
    //     dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    // }
    // // function removeTodolist(id: string) {
    // //     const action = removeTodolistAC(id)
    // //     dispatch(action)
    // // }
    // // function changeFilter(value: FilterValuesType, todolistId: string) {
    // //     dispatch(changeTodolistFilterAC(todolistId,value))
    // // }
    // function changeTodolistTitle(id: string, title: string) {
    //     dispatch(changeTodolistTitleAC(id,title))
    // }
    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <TodolistWithRedux
                                        todolist={tl}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWidthRedux;
