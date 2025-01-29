import { useState , useEffect } from "react";
import Header from "../Header";
import {useFormik} from "formik";
import validations from "./validations";
import {generateGuid} from "easy-guid-generator";

function Tasks({tasks, tasksState, customers}){

    const [mode , setMode] = useState("list");

    const {handleSubmit , handleChange , values , errors} = useFormik({
        initialValues:{
            id:"",
            summary:"",
            desc:"",
            customerid:"",
        },
        onSubmit:(values) => {
            console.log(values);

            if(mode === "add"){
                //insert  
                    tasksState([...tasks, {
                        id:generateGuid(false),
                        summary:values.summary,
                        desc:values.desc,
                        customerid:values.customerid
                    }])
            }else if(mode === "edit"){
                //update
                //values den gelen benim id mi ve diğer değerlerimi yakaldım ve 
                //yer değiştirerek güncellemiş oldum
                const task = tasks.find((item) => item.id === values.id);

                task.summary = values.summary;
                task.desc = values.desc;
                task.customerid = values.customerid;

                tasksState([...tasks]);
            }
        },
        validationSchema:validations
    });


    const onClickEdit = (e) => {

        const id =  e.target.getAttribute("data-id"); //gönderdiğim id yi attribute olarak yakaladım
        const task = tasks.find((item) => item.id === id); // yakaladımı data içinden buldum
  
        values.id = task.id;
        values.summary = task.summary;
        values.desc = task.desc;
        values.customerid = task.customerid;

        setMode("edit");
    };

    const onClickRemove = (e) => {
        const id =  e.target.getAttribute("data-id"); //gönderdiğim id yi attribute olarak yakaladım
        const task = tasks.find((item) => item.id === id); // yakaladımı data içinden buldum

        const result = window.confirm(`${task.summary}  başlıklı görev silinsin mi?`);
        
        if(task && result){

            const index =  customers.indexOf(task);
            tasks.splice(index,1);//sildim
            tasksState([...tasks]);
        }
        
    };

    useEffect(() => {

    },[mode])
    return(
        <>
            <Header title = "Tasks"/>

            {
                mode === "list" &&
                <div className="row mb-3">
                <div className="col">
                    <button className="btn btn-primary btn-sm" onClick={() => setMode("add")}>
                        <i className="fa fa-plus me-2"></i> Add New
                    </button>
                </div>
            </div>
            }

            {
                (mode === "add" || mode === "edit") &&
                <div className="row mb-3">
                <div className="col">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col">
                                <input type="text" name="summary" placeholder="Lorem , ipsum dolor." className="form-control form-control-sm"
                                onChange={handleChange} value = {values.summary}/>
                                <span className="badge small bg-danger">{errors.summary}</span>
                            </div>
                            <div className="col">
                            <input type="text" name="desc" placeholder="Lorem ipsum dolor sit amet." className="form-control form-control-sm"
                            onChange={handleChange} value = {values.desc}/>
                            <span className="badge small bg-danger">{errors.desc}</span>
                            </div>
                            <div className="col">
                                <select name="customerid" className="form-select-sm" onChange={handleChange}>
                                    {
                                        customers.map((cust) => {
                                            return <option key= {cust.id} value = {cust.id}>{cust.firstname} {cust.lastname}</option>
                                        })
                                    }

                                </select>
                            <span className="badge small bg-danger">{errors.phone}</span>
                            </div>
                            <div className="col">
                                <button type="submit" className="btn btn-primary btn-sm me-2">
                                    <i className="fa fa-save me-2"></i>{mode === "add" ? "Create" : "Save"}
                                    </button>
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={() => setMode("list")}>
                                    <i className="fa fa-times me-2"></i>Close
                                    </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            }
            <div className="row mb-3">
                <div className="col">
                    <table className="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th>Summary</th>
                                <th>Description</th>
                                <th>Customer</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                               tasks.map((task , i) => {

                                    let cus = customers.find((item) => item.id === task.customerid);

                                    return <tr key={task.id}>
                                    <td>{task.summary}</td>
                                    <td>{task.desc}</td>
                                    <td></td>
                                    <td></td>
                                        <td>
                                            {
                                            mode === "list" &&
                                            <span>
                                             <i className="fa fa-edit text-secondary small me-2" data-id ={task.id}  onClick={onClickEdit}></i>
                                             <i className="fa fa-trash text-danger small" data-id ={task.id}  onClick={onClickRemove}></i>
                                            </span>
                                            }
    
                                        </td>
                                </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </>
    );
}

export default Tasks;