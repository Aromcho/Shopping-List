import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Login = () => {
    const { login, error } = useAuth();
    const navigate = useNavigate(); 
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        await login(data);
        if (!error) {
            navigate("/");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Login</h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        {...register("email", { 
                                            required: "El correo electrónico es obligatorio", 
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: "El formato del correo no es válido"
                                            }
                                        })}
                                    />
                                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        {...register("password", { required: "La contraseña es obligatoria" })}
                                    />
                                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                                </div>
                                {error && <p className="text-danger">{error}</p>} {/* Mostrar error del servidor */}
                                <button type="submit" className="btn btn-primary btn-block mt-3">
                                    Login
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <p>Don't have an account?</p>
                                <Link to="/register" className="btn btn-link">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
