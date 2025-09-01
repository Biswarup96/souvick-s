import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slice/authSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const{register,handleSubmit,formState:{errors}}=useForm()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const submitHandler=(data)=>{
        console.log('submitted data', data)
        const formData={
            username:data.username,
            password:data.password
        }
        dispatch(login(formData))
        
        .then((res)=>{
            if(res.payload.status_code===200){
                toast.success(res.payload?.message)
                navigate('/dashboard')
            }else{
                toast.error(res.payload?.message)
            }
        })
        .catch((error)=>{
            console.error(error || "login failed")
        })
    }
    return (
        <div>
            <div className='container'>
                <div className='flex min-h-[100vh] justify-center items-center'>
                    <form className='border-1 w-full max-w-[400px] rounded-2xl p-8 flex flex-col gap-4'
                        onSubmit={handleSubmit(submitHandler)}>
                        <h2 className='text-center font-bold text-2xl'>Login</h2>
                        <div>
                            <label>Username</label>
                            <input type='text' placeholder='Enter Username'
                                className='border w-full h-[40px] rounded-lg px-2 mt-2'
                                {
                                    ...register('username',{
                                        required:{
                                            value:true,
                                            message:"username is required"
                                        }
                                    })
                                }
                            />
                            {errors.username && <p className='text-red-500'>{errors.username.message}</p>}
                        </div>
                        <div>
                            <label>Password</label>
                            <div className='relative h-[40px]'>
                                <input type={showPassword ? "text" : "password"} placeholder='Enter Password'
                                    className='border w-full h-[40px] rounded-lg px-2 mt-2'
                                    {
                                        ...register('password',{
                                            required:{
                                                value:true,
                                                message:"password is required"
                                            }
                                        })
                                    }
                                />
                                <span className='absolute right-2 top-1/2 select-none text-xl cursor-pointer'
                                    onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <FiEye /> : <FiEyeOff />}
                                </span>
                            </div>
                            {errors.password && <p className='text-red-500 pt-2'>{errors.password.message}</p>}
                        </div>
                        <button type="submit" className='px-4 py-1 bg-[#1663ea] hover:bg-[#1664ea87] rounded-2xl text-amber-100 text-lg cursor-pointer'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login