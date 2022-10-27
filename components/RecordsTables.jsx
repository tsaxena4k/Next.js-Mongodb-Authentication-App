import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useCurrentUser } from '../lib/hooks';
import { useRouter } from 'next/router';
import Link from 'next/link';


const DashboardSection = () => {
    const [user, { mutate }] = useCurrentUser();

    const [records, setData] = useState([]);
    const [loading, isLoading] = useState(false);
    const nameRef = useRef();
    const bioRef = useRef();
    const profilePictureRef = useRef();
    const [msg, setMsg] = useState({ message: '', isError: false });
    const router = useRouter();
   
    useEffect(() => {
        isLoading(true)
        fetch('/api/fetchRecords')
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            isLoading(false)
          })
    }, [])

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Records</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all you records added.
                    </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link href='/recordsForms'><a className='btn btn-primary'>Add New Records</a></Link>
                    </div>
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Full Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Alternate Family Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Year
                                </th>
                                <th scope="col" className="px-10 py-12 text-left text-sm font-semibold text-gray-900">
                                    Dissertation Title
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    University
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    City
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    State
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Country
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Pages
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Advisor
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Status
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Added Date
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {records.map((person) => (
                                <tr key={person.email}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                    <div className="flex items-center">
                                        <div className="ml-4">
                                            <div className="font-medium">{person.fname} {person.mname} {person.lname}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <div className="">{person.alFname}</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs 
                                    font-semibold leading-5 text-green-800">
                                        {person.year}
                                    </span>
                                </td>
                                <td className="px-5 py-5 text-sm">
                                        {person.dissertation_Title}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        {person.universityDetails[0].name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        {person.citiesdetails[0].name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        {person.statesdetails[0].name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        {person.countriesdetails[0].name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        {person.pages}
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    {person.advisorName[0].name}
                                </td>

                                {
                                    (person.status == '2')?
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <span className="inline-flex rounded-full bg-blue-100 px-2 
                                            text-xs font-semibold leading-5 text-green-800">
                                            Pending
                                        </span>
                                    </td>:(person.status == '1')?
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <span className="inline-flex rounded-full bg-green-100 px-2 
                                            text-xs font-semibold leading-5 text-green-800">
                                            Active
                                        </span>
                                    </td>:<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                        <span className="inline-flex rounded-full bg-red-100 px-2 
                                            text-xs font-semibold leading-5 text-red-800">
                                            Rejected
                                        </span>
                                    </td>
                                }
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <div className="ml-4">
                                        <div className="font-medium">{person.createdate}</div>
                                    </div>
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <div className="ml-4">
                                        <div className="font-medium">Edit</div>
                                    </div>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};


const DashboardPage = () => {
    const [user] = useCurrentUser();
    if (!user) {
        return (
            <>
                <p>Loading</p>
            </>
        );
    }
    return (
        <>
            <DashboardSection />
        </>
    );
};
export default DashboardPage;