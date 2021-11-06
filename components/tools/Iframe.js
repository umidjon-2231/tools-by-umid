import React, {useState} from 'react';
import {AvForm, AvField} from "availity-reactstrap-validation"
import axios from "axios";

const Iframe = () => {
    const [data, setData]=useState("")

    const set = async (e, v) => {
        let res=await axios.get(v.url, {headers: {"Content-type": "text/html"}})
        setData(res.data)
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-3">
                    <AvForm onValidSubmit={set}>
                        <AvField autoComplete='off' type={"text"} name="url" placeholder="Url"/>
                        <button type="submit" className="btn btn-success">go</button>
                    </AvForm>
                </div>
            </div>

            {data?data:""}

        </div>
    );
};

export default Iframe;