import {useParams} from "react-router-dom";



function CustomerTasks({customers,tasks}){

    const {id} = useParams();
    const customer = customers.find((item) => item.id === id);
    const filteredTask = tasks.filter((item) => item.customerid === id);

    return(
        <>

<div className="row">
    <div className="col">
        <h5>Taks of   ({filteredTask.length})</h5>
        <hr />
        {/* {customer.firstname} {customer.lastname} */}
    </div>
</div>
        <div className="row mb-3">
                <div className="col">
                    <table className="table table-hover table-sm">
                        <thead>
                            <tr>
                                <th>Summary</th>
                                <th>Description</th>
                                <th>Customer</th>
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

export default CustomerTasks;