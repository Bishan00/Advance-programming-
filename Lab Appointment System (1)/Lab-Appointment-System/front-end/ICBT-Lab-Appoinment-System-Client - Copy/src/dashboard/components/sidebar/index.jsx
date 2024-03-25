import React from 'react'
import Dashboard from './../dashboard/index';
import { Link } from 'react-router-dom';
import useAuth from '../../../libs/hooks/UseAuth';

function SideBar() {
    const { setAuth, auth } = useAuth()
    return (
        <div className="p-2 bg-white w-60 flex flex-col md:flex border-r-[0.5px] border-gray-300" id="sideNav">
            <nav>
                <Link to={'/dashboard'} className="block text-black py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white" >
                    <i className="fas fa-home mr-2" />Dashboard
                </Link>
                <Link to={'/dashboard/appointment'} className="block text-black py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white" >
                    <i className="fas fa-file-alt mr-2" />Appointment
                </Link>
                {
                auth.userRole === 'TECH' ?
                        (
                            <Link to={'/dashboard/report_section'} className="block text-black py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white" >
                                <i className="fas fa-file-alt mr-2" />Report Section
                            </Link>
                        )
                        : auth.userRole === 'USER' ?
                        (
                            <Link to={'/dashboard/report'} className="block text-black py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white" >
                                <i className="fas fa-file-alt mr-2" />Reports
                            </Link>
                        )
                        : auth.userRole === 'ADMIN' && 
                        (
                            <Link to={'/dashboard/report'} className="block text-black py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white" >
                                <i className="fas fa-file-alt mr-2" />Reports
                            </Link>
                        )
                }
                
                <Link to={'/dashboard/settings'} className="block text-black py-2.5 px-4 my-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white" >
                    <i className="fas fa-users mr-2" />Settings
                </Link>
            </nav>
            <Link to={'/'} className="block text-black py-2.5 px-4 my-2 rounded transition duration-200 hover:bg-blue-700 hover:text-white mt-auto" >
                <i className="fas fa-sign-out-alt mr-2" />Log Out
            </Link>
            <div className="bg-gray-300 h-px mt-2" />
            <p className="mb-1 px-5 py-3 text-left text-xs blue-700">Copyright ICBT@2023</p>
        </div>
    )
}

export default SideBar