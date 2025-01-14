import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import{ Button} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Register = () => {
    const { register, handleSubmit } = useForm();
    const { signup, user, isAuth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) 
            navigate('/shoppinglist');
    }, [isAuth]);

    console.log(user);
    const onSubmit = async data => {
        signup(data);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Register</h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id="username" className="form-control" {...register('username', { required: true })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" className="form-control" {...register('email', { required: true })} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id="password" className="form-control" {...register('password')} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-3">Register</button>
                            </form>
                            <div className="text-center mt-3">

                            <p>Already acount</p>
                            <Link to="/login">login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Register;