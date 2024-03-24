import React, { useState } from 'react'
import UserRegister from '../../components/UserRegister'
import UserLogin from '../../components/UserLogin'

function RegisterLoginLayout() {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <section className="bg-white dark:bg-gray-900 bg-cover">
            {/* <div className='z- w-full h-screen bg-cover' style={{ backgroundImage: `url(https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`, filter: 'blur(10px)' }}></div> */}
            <div className="flex justify-center min-h-screen">
                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5 shadow-md my-auto">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                            ABC Lab Appointment System
                        </h1>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            Welcome to the ABC Laboratories Lab Appointment System. Please enter your credentials to access the system.
                        </p>

                        {isLogin ? <UserLogin /> : <UserRegister />}
                        <div className="mt-6">
                            <div className="mt-3 md:flex md:items-center md:-mx-2">
                                {isLogin ?
                                    (
                                        <p className="mt-10 text-center text-sm text-gray-500">
                                            Not a member?
                                            <button
                                                onClick={(e) => setIsLogin(false)}
                                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2"
                                            >
                                                Register
                                            </button>
                                        </p>
                                    )
                                    :
                                    (
                                        <p className="mt-10 text-center text-sm text-gray-500">
                                            Already member?
                                            <button
                                                onClick={(e) => setIsLogin(true)}
                                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-2"
                                            >
                                                Login
                                            </button>
                                        </p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterLoginLayout