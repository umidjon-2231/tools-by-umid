import React, {useState} from 'react';
import {AvForm, AvField} from "availity-reactstrap-validation"
import axios from "axios";
import {useHttp} from "../../hooks/https.hook";

const Iframe = () => {
    const [data, setData]=useState("")
    const {request}=useHttp()
    const set = async (e, v) => {
        const response=await request("/api/iframe", "POST", {url: v.url}, {"Content-type": "text/html"})
        setData(""+response.data)

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
            {data? <iframe src={data} width="1000px" height={800}/>:""}
        </div>
    );
};

export default Iframe;