import React from 'react'
import PatientComponent from './components/patientComponent'
import useAuth from '../../../libs/hooks/UseAuth'
import Admin from './components/admin';
import Technician from './components/technician';

function Dashboard() {
    const { setAuth, auth } = useAuth()
    if (auth.userRole === "USER") {
        return <PatientComponent />;
    } else if (auth.userRole === "ADMIN") {
        return <Admin />;
    } else if (auth.userRole === "TECH") {
        return <Technician />;
    }
}

export default Dashboard