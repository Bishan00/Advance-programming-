import React from 'react'
import RegisterLoginLayout from './../auth/layout/RegisterLoginLayout/index';
import { Route, Routes } from 'react-router';
import MainLayout from '../libs/layouts/MainLayout';
import Dashboard from './../dashboard/components/dashboard/index';
import RequireAuth from './../libs/components/RequireAuth';
import DashboardLayout from '../dashboard/layouts/DashboardLayout';
import Appointment from '../dashboard/components/appointment';
import Settings from '../dashboard/components/settings';
import ReportUpload from './../dashboard/components/reportUpload';
import Report from './../dashboard/components/reportView';

function AppRoute() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path='/' element={<RegisterLoginLayout />} />

                <Route element={<RequireAuth allowRole={["USER", "ADMIN", "TECH"]} />}>
                    <Route path='/' element={<DashboardLayout />}>
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/dashboard/appointment' element={<Appointment />} />
                        <Route path='/dashboard/settings' element={<Settings />} />
                        <Route path='/dashboard/report_section' element={<ReportUpload />} />
                        <Route path='/dashboard/report' element={<Report />} />
                    </Route>
                </Route>
            </Route>

        </Routes>
    )
}

export default AppRoute