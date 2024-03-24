import React, { useEffect, useState } from 'react'
import useAuth from '../../../../libs/hooks/UseAuth';

function Technician() {
  const { setAuth, auth } = useAuth()
  const [appointment, setAppointment] = useState([]);
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:9000/user/appointment/get_all_appointment", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${auth.accessToken}`
          },
          redirect: "follow"
        });
        if (response.ok) {
          const result = await response.json();
          console.log(result)
          setAppointment(result);
          setAppointmentCount(result.length)
        } else {
          console.error('Failed to fetch reports');
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);
  return (
    <div className="m-10 w-full">
      <div className="mb-10 w-4/5">
        <h1 className="text-2xl mb-4 font-semibold">Appointment system Dashboard</h1>
        <p className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem perferendis quis in labore illo voluptates suscipit eligendi hic atque nostrum.</p>
      </div>
      <div>
        <div className="relative overflow-x-auto w-3/5 mt-10">
          <div className='mb-5'>
            <h1 className='text-xl font-semibold'>All Appointment</h1>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 border border-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Appointment ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Patient ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Patient Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Patient Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Patient Contact No
                </th>
                <th scope="col" className="px-6 py-3">
                  Patient Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Patient DOB
                </th>
                <th scope="col" className="px-6 py-3">
                  Test Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Additional Information
                </th>
              </tr>
            </thead>
            <tbody>
              {appointment.map(appointment => (
                <tr key={appointment.appointmentId} className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {appointment.id}
                  </td>
                  <td className="px-6 py-4">{appointment.userId}</td>
                  <td className="px-6 py-4">{`${appointment.userFirstName} ${appointment.userLastName}`}</td>
                  <td className="px-6 py-4">{appointment.userEmail}</td>
                  <td className="px-6 py-4">{appointment.userContactNumber}</td>
                  <td className="px-6 py-4">{appointment.userAddress}</td>
                  <td className="px-6 py-4">{appointment.userDateOfBirth}</td>
                  <td className="px-6 py-4">{appointment.userProcedureRequest}</td>
                  <td className="px-6 py-4">{appointment.userAdditionalInformation}</td>
                  {/* <td className="px-6 py-4"><button onClick={openPDFInNewTab}>view</button></td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Technician