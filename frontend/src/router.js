// fronend/src / router.js

import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import TaskList from "./components/Tasks/TaskList";
import TaskDetail from "./pages/TaskDetail";
import NotFound from "./components/NotFound";
import CreateTask from "./pages/CreateTask";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true, // default route
                element:<Home/>
            
            },
            {
                path: "tasks",
                element: <TaskList />
                
            },
            {
                path: "tasks/new",
                element: <CreateTask />
                
            },
            
            {
                path: 'tasks/:taskId',
                element: <TaskDetail />
                
            },
            {
                path: "*", // catch all route for 404 Not Found 
                element:<NotFound/>
            }
        ]
    }
])

export default router;