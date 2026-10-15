
"use client"
import '../dashboardStyle.css';

import { useAuth } from '@/contexts/authContext/authContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const {user ,logout} = useAuth();
    const router = useRouter();
    
    function editProfile(){
        router.push('/dashboard/profile/edit');
    };
    
    return(
        <>
        <div className='profile-page'>
            <div className="profile-card">
                <div className='profile-header'>
                    <div className='img-box'>
                    
                    </div>
                    <h1 className='mb-2  font-bold text-'>My Profile</h1>
                    <p className='profile-subtitle'>Manage your Personal Information</p>
                </div>
                <div className='profile-details'>
                    <div className='profile-field'>
                        <label>FULL NAME</label>
                        <p> {user?.name || "Not avialable"}</p>
                    </div>
                    <div className='profile-field'>
                        <label>EMAIL ADDRESS</label>
                        <p> {user?.email || "Not avialable"}</p>
                    </div>
                    <div className='profile-field'>
                        <label>ROLE</label>
                        <p className='role-badge'> 
                            {typeof user?.role === "string"
                            ? user.role
                            : user?.role?.name || "Not available"}
                        </p>
                    </div>
                </div>
                <div>
                    <button className='btn' onClick={logout}>Logout</button>
                    <button className='btn' onClick={editProfile} >Edit-Profile</button>
                </div>
            </div>
        </div>
        </>
    );
};