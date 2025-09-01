import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCoachList, fetchUserList, logout } from '../redux/slice/authSlice'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const { isLoading, coachList, userList, role } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate=useNavigate();

    useEffect(() => {
        dispatch(fetchCoachList())
        if (role === 'Super Admin') {
            dispatch(fetchUserList())
            
        }
    }, [dispatch, role])

    const handleLogout=()=>{
        const confirmLogOut = window.confirm('Are you sure you went to log out?')
        if(confirmLogOut){
            dispatch(logout());
            navigate('/')   
        }else return;
    }

    console.log('coachList', coachList)
    console.log('userList', userList)
    const sortedCoachList = coachList.slice().sort((a, b) => a.id - b.id)

    if (isLoading) {
        return (
            <div className='h-[100vh] w-[100vw] flex justify-center items-center'>
                <h2 className='text-center text-2xl'>Loading...</h2>
            </div>
        )
    }

    return (
        <section className='py-6'>
            <div className='container mx-auto'>
                <h1 className='text-center text-3xl font-bold mb-2'>Dashboard</h1>
                <div className='flex justify-end'>
                    <button onClick={handleLogout}
                        className='p-1 px-4 bg-[#1e5be8] text-amber-50 text-xl rounded-2xl cursor-pointer hover:bg-[#1e5be891]'>
                        Logout
                    </button>
                </div>
                <h2 className='text-2xl font-semibold mb-2'>Coach List</h2>
                <div className='overflow-x-auto mb-8'>
                    <table className='min-w-full border border-gray-300'>
                        <thead className='bg-gray-200'>
                            <tr>
                                <th className='border px-4 py-2'>ID</th>
                                <th className='border px-4 py-2'>Name</th>
                                <th className='border px-4 py-2'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedCoachList?.map((coach) => (
                                <tr key={coach.id} className='text-center'>
                                    <td className='border px-4 py-2'>{coach.id}</td>
                                    <td className='border px-4 py-2'>{coach.f_name} {coach.l_name}</td>
                                    <td className='border px-4 py-2'>{coach.status === 1 ? 'Active' : 'Inactive'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {role === 'Super Admin' && (
                    <>
                        <h2 className='text-2xl font-semibold mb-2'>User List</h2>
                        <div className='overflow-x-auto'>
                            <table className='min-w-full border border-gray-300 border-collapse'>
                                <thead className='bg-gray-200'>
                                    <tr>
                                        <th className='border px-4 py-2'>ID</th>
                                        <th className='border px-4 py-2'>Name</th>
                                        <th className='border px-4 py-2'>Email</th>
                                        <th className='border px-4 py-2'>Mobile</th>
                                        <th className='border px-4 py-2'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList?.map((user) => (
                                        <tr key={user.id} className='text-center'>
                                            <td className='border px-4 py-2'>{user.id}</td>
                                            <td className='border px-4 py-2'>{user.f_name} {user.l_name}</td>
                                            <td className='border px-4 py-2'>{user.email}</td>
                                            <td className='border px-4 py-2'>{user.mobile}</td>
                                            <td className='border px-4 py-2'>{user.status === 1 ? 'Active' : 'Inactive'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default Dashboard
