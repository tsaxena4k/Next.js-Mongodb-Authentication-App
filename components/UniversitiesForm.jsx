import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useCurrentUser } from '../lib/hooks';
import { useRouter } from 'next/router';
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon, MapIcon, BuildingLibraryIcon} from '@heroicons/react/24/outline';


const DashboardSection = () => {
    const [loading, isLoading] = useState(false);
    const [selectedCountry, setselectedCountry] = useState('');
    const [selectedStates, setselectedStates] = useState('');
    const [selectedCity, setselectedCity] = useState('');
    const [errorMsg, setErrorMsg] = useState("");
    const [countries, setData] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const nameRef = useRef();
    const countryRef = useRef();
    const stateRef = useRef();
    const cityRef = useRef();


    useEffect(() => {
        isLoading(true)
        fetch('/api/fetchCountries')
          .then((res) => res.json())
          .then((data) => {
            setData(data)
            isLoading(false)
          })
    }, [])

    const [user, { mutate }] = useCurrentUser();   
    const navigation = [
        { name: 'Dashboard', icon: HomeIcon, href: 'dashboard', current: false },
        { name: 'Universities', icon: BuildingLibraryIcon, href: 'universities', count: 4, current: true },
        { name: 'records requests', icon: CalendarIcon, href: 'records', current: false },
        { name: 'Posters', icon: InboxIcon, href: 'posters', current: false },
        { name: 'Rewards Rules', icon: ChartBarIcon, href: '#', count: 12, current: false },
    ];
    const [msg, setMsg] = useState({ message: '', isError: false });
    const router = useRouter();

    const callStates = async (e) => {
        setselectedCountry(e.target.value);
        isLoading(true);
        setCities([]);
        fetch(`/api/fetchStates?id=${e.target.value}`)
          .then((res) => res.json())
          .then((data) => {
            setStates(data)
            isLoading(false)
        });
    };

    const callCities = async (e) => {
        setselectedStates(e.target.value);
        isLoading(true);
        fetch(`/api/fetchCities?country_id=${selectedCountry}&state_id=${e.target.value}`)
          .then((res) => res.json())
          .then((data) => {
            setCities(data)
            isLoading(false)
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        isLoading(true);
        const formData = new FormData();

        const body = {
            name: nameRef.current.value,
            country: countryRef.current.value,
            state: stateRef.current.value,
            city: cityRef.current.value,
            createby: user.id,
            createdate: new Date().toDateString()
        };
        const res = await fetch("/api/universities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (res.status === 200) {
            const userData = await res.json();
            mutate({
                user: {
                    ...user,
                    ...userData.user,
                },
            });
            setMsg({ message: 'updated' });
        } else {
            setMsg({ message: await res.text(), isError: true });
        }
        isLoading(false);
        setTimeout(() => setMsg(''), 2500);
    };
    
    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <form onSubmit={handleSubmit} className="space-y-6" method="POST">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">University Information</h3>
                        <p className="mt-1 text-sm text-gray-500">Add new University Information</p>
                    </div>
                    <div className="mt-5 md:col-span-2 md:mt-0">
                        <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                            Name
                            </label>
                            <input
                            type="text"
                            required
                            name="name"
                            id="name"
                            autoComplete="given-name"
                            ref={nameRef}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            Country
                            </label>
                            <select
                                required
                                id="location"
                                name="location"
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                defaultValue=""
                                value={selectedCountry}
                                ref={countryRef}
                                onChange={callStates}
                                >
                                {countries.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            states
                            </label>
                            <select
                                id="location"
                                name="location"
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                defaultValue=""
                                ref={stateRef}
                                value={selectedStates}
                                onChange={(event) => callCities(event)}
                            >
                               {(states)?states.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )):<option></option>}
                            </select>
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                            City
                            </label>
                            <select
                                id="location"
                                name="location"
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                defaultValue=""
                                value={selectedCity}
                                ref={cityRef}
                                onChange={setselectedCity}
                            >
                                {cities.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>

                        </div>
                    </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    Cancel
                    </button>

                    <button
                    type="submit"
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    {loading ? <div class="spinner-border" role="status" style={{ width: '1.5rem', height: '1.5rem' }}>
                        <span class="visually-hidden">Loading...</span>
                    </div> : <>Save</>}
                    </button>
                </div>
                </form>
        </>
    );
};


const DashboardPage = () => {
    const [user] = useCurrentUser();
    if (!user) {
        return (
            <>
                <p>Please sign in</p>
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