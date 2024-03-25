import React, { useState } from "react";
import useAuth from './../../../libs/hooks/UseAuth';
import Patient from "./components/patient";
import Admin from "./components/admin";
import Technician from "./components/technician";

function Appointment() {
    const { setAuth, auth } = useAuth()

    if (auth.userRole === "USER") {
        return <Patient />;
    } else if (auth.userRole === "ADMIN") {
        return <Admin />;
    } else if (auth.userRole === "TECH") {
        return <Technician />;
    }
}

export default Appointment