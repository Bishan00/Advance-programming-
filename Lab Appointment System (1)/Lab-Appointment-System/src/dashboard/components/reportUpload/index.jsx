import React, { useState } from "react";
import 'react-dropdown/style.css';
import 'react-datepicker/dist/react-datepicker.css'
import useAuth from "../../../libs/hooks/UseAuth";

function ReportUpload() {
    const { setAuth, auth } = useAuth()
    const [selectedFile, setSelectedFile] = useState(null);
    const [reportDescription, setReportDescription] = useState('');
    const [details, setDetails] = useState({
        id: "",
        userAdditionalInformation: "",
        userAddress: "",
        userContactNumber: "",
        userDateOfBirth: "",
        userEmail: "",
        userFirstName: "",
        userGender: "",
        userId: "",
        userLastName: "",
        userProcedureRequest: "",
    });

    const fetchDetails = async(appointmentId)=> {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${auth.accessToken}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        return fetch(`http://localhost:9000/lab_report_upload/${appointmentId}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (!result) {
                    return {
                        id: "",
                        userAdditionalInformation: "",
                        userAddress: "",
                        userContactNumber: "",
                        userDateOfBirth: "",
                        userEmail: "",
                        userFirstName: "",
                        userGender: "",
                        userId: "",
                        userLastName: "",
                        userProcedureRequest: "",
                    }
                }
                return result;
            })
            .catch((error) => console.error(error));
    }

    async function handleInputChange(event) {
        setDetails(await fetchDetails(event.target.value));
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            setSelectedFile(file);
        } else {
            console.error('Please select a PDF file.');
        }
    };

    const handleUpload = () => {
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${auth.accessToken}`);

        const formData = new FormData();
        formData.append("report", selectedFile);
        formData.append("appointmentId", details.id);
        formData.append("patientId", details.userId);
        formData.append("patientFullName", `${details.userFirstName} ${details.userLastName}`);
        formData.append("patientEmail", details.userEmail);
        formData.append("patientDescription", reportDescription);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formData,
            redirect: "follow"
        };

        fetch("http://localhost:9000/lab_report_upload/upload", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    };
    return (
        <div className="m-10 w-full">
            <div className="mb-16 w-3/5">
                <h1 className="text-2xl mb-2 font-semibold">Report Upload</h1>
                <p className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem perferendis quis in labore illo voluptates suscipit eligendi hic atque nostrum.</p>
            </div>
            <div className="bg-white rounded pb-8 mb-4 flex flex-col w-3/5">
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                        >
                            Appointment ID
                        </label>
                        <input
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-500 rounded py-3 px-4 mb-3"
                            id="grid-first-name"
                            type="text"
                            placeholder="###"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="md:w-1/2 px-3">
                        <label
                            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                            htmlFor="grid-last-name"
                        >
                            Patient Name
                        </label>
                        <input
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-500 rounded py-3 px-4"
                            id="grid-last-name"
                            type="text"
                            value={`${details.userFirstName} ${details.userLastName}`}
                            placeholder="Doe"
                            disabled
                        />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="md:w-full px-3">
                        <label
                            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                            Patient Email
                        </label>
                        <input
                            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-gray-500 rounded py-3 px-4 mb-3"
                            id="grid-password"
                            type="email"
                            value={details.userEmail}
                            placeholder="example@gmail.com"
                        />
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="w-full px-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <textarea onChange={e => setReportDescription(e.target.value)} name="additionalInformation" id="message" rows="4" className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-500 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
                    </div>
                </div>
                <div className="-mx-3 md:flex mb-6">
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full  border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload your report</span>
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    PDF
                                </p>
                            </div>
                            <input accept=".pdf" id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                </div>
                <button onClick={handleUpload} type="submit" className=" bg-blue-700 hover:bg-blue-800 font-semibold text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-64">
                    Upload Report
                </button>
            </div>
        </div>
    )
}

export default ReportUpload