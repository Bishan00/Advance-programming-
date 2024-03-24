import React from 'react'

function TopBar() {
    return (
        <div className="bg-white text-white w-full p-6 flex items-center justify-between border border-b-[0.5px] border-gray-300">
            <div className="flex items-center">
                <div className="hidden md:flex items-center">
                    <h2 className="font-bold text-xl text-black">Lab Appointment System</h2>
                </div>
            </div>
            <div className="space-x-5">
                <button>
                    <i className="fas fa-bell text-gray-500 text-lg" />
                </button>
                <button>
                    <i className="fas fa-user text-gray-500 text-lg" />
                </button>
            </div>
        </div>
    )
}

export default TopBar