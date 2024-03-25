import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';

function UserRegister() {

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        phoneNumber: Yup.string().matches(/^[0-9]{3}-[0-9]{2}-[0-9]{4}-[0-9]{3}$/, 'Invalid phone number').required('Phone Number is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    });

    const handleSubmit = async (values, actions) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": "{{token}}"
            },
            body: JSON.stringify({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                mobileNumber: values.phoneNumber,
                password: values.password,
                role: "USER"
            })
        };

        try {
            const response = await fetch("http://localhost:9000/auth/signup", requestOptions);
            const data = await response.json();
            toast.success(`${data.message}`)
        } catch (error) {
            toast.error(`${data.message}`)
        }

        actions.setSubmitting(false);
    };

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                password: '',
                confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched }) => (
                <Form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                    <Toaster />
                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">First Name</label>
                        <Field type="text" name="firstName" placeholder="John" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-500 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-800 dark:focus:border-blue-800 focus:ring-blue-800 focus:outline-none focus:ring focus:ring-opacity-40" />
                        {errors.firstName && touched.firstName && <div className="text-red-500">{errors.firstName}</div>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Last name</label>
                        <Field type="text" name="lastName" placeholder="Snow" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-500 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-800 dark:focus:border-blue-800 focus:ring-blue-800 focus:outline-none focus:ring focus:ring-opacity-40" />
                        {errors.lastName && touched.lastName && <div className="text-red-500">{errors.lastName}</div>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone number</label>
                        <Field type="text" name="phoneNumber" placeholder="XXX-XX-XXXX-XXX" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-500 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-800 dark:focus:border-blue-800 focus:ring-blue-800 focus:outline-none focus:ring focus:ring-opacity-40" />
                        {errors.phoneNumber && touched.phoneNumber && <div className="text-red-500">{errors.phoneNumber}</div>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                        <Field type="email" name="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-500 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-800 dark:focus:border-blue-800 focus:ring-blue-800 focus:outline-none focus:ring focus:ring-opacity-40" />
                        {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                        <Field type="password" name="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-500 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-800 dark:focus:border-blue-800 focus:ring-blue-800 focus:outline-none focus:ring focus:ring-opacity-40" />
                        {errors.password && touched.password && <div className="text-red-500">{errors.password}</div>}
                    </div>
                    <div>
                        <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirm password</label>
                        <Field type="password" name="confirmPassword" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-500 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-800 dark:focus:border-blue-800 focus:ring-blue-800 focus:outline-none focus:ring focus:ring-opacity-40" />
                        {errors.confirmPassword && touched.confirmPassword && <div className="text-red-500">{errors.confirmPassword}</div>}
                    </div>
                    <button type='submit' className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        <span>Sign Up </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </Form >
            )}
        </Formik>
    )
}

export default UserRegister