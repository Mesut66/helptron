import { useState , useEffect } from "react";
import {Link , Routes , Route , useMatch} from "react-router-dom";
import "./App.css"; 
import Customers from "./components/Customers";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import CustomerTasks from "./components/Customers/CustomerTasks";

function App() {
 const [customers , setCustomers] = useState([]);
 const [tasks , setTasks] = useState([]);

 useEffect(() => {
  console.log(customers);
  console.log(tasks);
 },[customers,tasks]);


  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">Helptron</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className={useMatch({path:"",end:true}) ? "nav-link active" : "nav-link"}>Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/customers" className={useMatch({path:"customers",end:true}) ? "nav-link active" : "nav-link"}>Customers</Link>
                </li>
                <li className="nav-item">
                  <Link to="/tasks" className={useMatch({path:"tasks",end:true}) ? "nav-link active" : "nav-link"}>Tasks</Link>
                </li>
              </ul>
            </div>
          </div>

        </nav>
        <div className = "container p-3">
          <Routes>
            <Route path="/" element = {<Dashboard  customers ={customers} customersState={setCustomers} tasks ={tasks} tasksState={setTasks}/>} />
            <Route path="customers" element = {<Customers customers ={customers} customersState={setCustomers}/>}>
              
              <Route path=":id" element= {<CustomerTasks customers ={customers} tasks ={tasks}/>}/>
              </Route>
            <Route path="tasks" element = {<Tasks tasks ={tasks} tasksState={setTasks} customers ={customers}/>} />
            <Route path="*" element = {
              <div className="row my-5">
                <div className="col text-center">
                  <h4 className="display-5">Aradığınız sayfa bulunamadı!</h4>
                  <Link to="/" className="btn btn-primary btn-sm mt-4">Dashboard'a Dön!</Link>
                </div>
              </div>
            } />
          </Routes>

        </div>
    </>
  );
}

export default App;
