 
// frontend/src/context/TaskContext.jsx

import axios from "axios";
import {  createContext, useContext, useReducer } from "react";


// initial state for tasks
const initialState = {
    tasks: [],
    loading: false,
    error: null,
    
}

// Define action types for clarity to avoid typos


const ACTIONS = {

    FETCH_TASKS_REQUEST:'FETCH_TASKS_REQUEST',
    FETCH_TASKS_SUCCESS:'FETCH_TASKS_SUCCESS',
    FETCH_TASKS_FAILURE:'FETCH_TASKS_FAILURE',
    ADD_TASK: 'ADD_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
    DELETE_TASK: 'DELETE_TASK',
    
}

// create task context

const TaskContext = createContext();

// Reducer function to handle state changes based on dispatched action

const taskReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.FETCH_TASKS_REQUEST:
            return { ...state, loading: true, error: null };
        case ACTIONS.FETCH_TASKS_SUCCESS:
            return { ...state, loading: false, tasks: action.payload };
        case ACTIONS.FETCH_TASKS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ACTIONS.ADD_TASK:
            return { ...state, tasks: [...state.tasks, action.payload] };
        case ACTIONS.UPDATE_TASK:
            return {
                ...state, tasks: state.tasks.map((task) => task.id === action.payload.id ? action.payload : task)
            };
        case ACTIONS.DELETE_TASK:
            return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
        default:
            return state;
    }
}

// Task provider to wrap the application and provide the taskContext

export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    // fetch all tasks from the backend
    const fetchTasks = async () => {
        dispatch({
            type: ACTIONS.FETCH_TASKS_REQUEST,
        });
        try {
            const res = await axios.get('/api/tasks');
            const tasks = res.data;
            dispatch({
                type: ACTIONS.FETCH_TASKS_SUCCESS,
                payload: tasks
            });

        } catch (err) {
   
            dispatch({
                type: ACTIONS.FETCH_TASKS_FAILURE,
                payload: err
            });

        }
    }
    // Add a new task

    /**
    * add a new task
    * @param {Object} taskData - data for a new task
            
    */
    const addTask = async (taskData) => {
       
        
        try {
            const res = await axios.post('/api/tasks', taskData)
            const task = res.data;
            dispatch({
                type: ACTIONS.ADD_TASK,
                payload: task
            });




        } catch (err) {
            dispatch({ type: ACTIONS.FETCH_TASKS_FAILURE, payload: `Error adding task: ${err.message}` });
            
        }
    }
    /**
     * Update a task 
     * @param {number} taskId -Id of the task update
     * @param {Object} updatedData - updated data for the task
     */
    const updateTask = async (taskId, updatedData) => {
        try {
            const res = await axios.put(`/api/tasks/${taskId}`, updatedData);
            const updatedTask = res.data;
            dispatch({
                type: ACTIONS.UPDATE_TASK,
                payload: updatedTask
            })
        }catch (err) {
            console.error(`Error updating task with ID ${taskId}:`, err);
          }
    }
    /**
     * Delete a task by its id
     * @param {number} taskId - Id of the task to remove
     */
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`/api/tasks/${taskId}`);
            dispatch({
                type: ACTIONS.DELETE_TASK,
                payload: taskId
            })

        } catch (err) {
            console.error(`Error deleting task with ID ${taskId}:`, err);
        }
        
    }

    return (
        <TaskContext.Provider value={{
            tasks: state.tasks,
            loading: state.loading,
            error: state.error,
            fetchTasks,
            addTask,
            deleteTask,
            updateTask,
          
        }}>
            {children}
        </TaskContext.Provider>
    )


}

/**
 * Custom hook to consume taskContext easily
 */

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new  Error(" usetasks must be used withing a taskProvider !")
    }
    return context;

}