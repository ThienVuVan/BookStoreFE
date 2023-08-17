import { useEffect } from 'react';
import { useAuth } from '../Sercutiry/AuthContext';



function Home() {

    // let handleDetele = (id) => {
    //     alert("Are you sure to delete this todo ?");
    //     deleteTodoApi(id)
    //         .then(() => {
    //             toast.success("Delete Success");
    //             retrieveTodos();
    //         })
    //         .catch(error => {
    //             toast.error("Delete unSuccess");
    //             console.log(error);
    //         })
    // }

    // let handleUpdate = (id) => {
    //     navigate(`/todo/${id}`);
    // }

    // let handleAddTodo = () => {
    //     navigate(`/todo/-1`);
    // }

    // return (
    //     <div className='container'>
    //         <h1>Things You Want To Do!</h1>
    //         <div>
    //             <table className='table'>
    //                 <thead>
    //                     <tr>
    //                         <th>UserName</th>
    //                         <th>Description</th>
    //                         <th>Target Date</th>
    //                         <th>Is Done?</th>
    //                         <th>Delete</th>
    //                         <th>Update</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {todos.map(item => (
    //                         <tr key={item.id}>
    //                             <td>{item.username}</td>
    //                             <td>{item.description}</td>
    //                             <td>{item.targetDate}</td>
    //                             <td>{item.done.toString()}</td>
    //                             <td><button className='btn btn-warning' onClick={() => handleDetele(item.id)}>Delete</button></td>
    //                             <td><button className='btn btn-success' onClick={() => handleUpdate(item.id)}>Update</button></td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //             <div><button className='btn btn-success' onClick={handleAddTodo}>Add New Todo</button></div>
    //         </div>
    //     </div>
    // )
    return (
        <>
            List Book Here
        </>
    )
}

export default Home;