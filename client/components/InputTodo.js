import React, { Fragment, useState } from "react";

const InputTodo = () => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async () => {
        e.preventDefault(); //we don't want this to refresh
        try {
           //send request
           const body = {description}; //package what you wan to send
           //send request to add data
           const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                header: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            //see if worked well
            console.log(response);
            window.location = "/"; //once response sent, it will refresh and show changes
        } catch(err) {
            console.error(err.message);
        }
    }

    return (<Fragment>
        <h1 className="text-center mt-5">My Todo List</h1>
        <form className="d-flex mt-5" onSubmit={onSubmitForm}>
            <input type="text" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
            <button className="btn btn-success">Add</button>
        </form>
    </Fragment>
    );
};

export default InputTodo;
