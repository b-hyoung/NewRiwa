import React, { useState ,useEffect } from 'react'

function User_GameLog({ useData }) {
    const [userData , setUserData] = useState(useData);


    return (
        <>
            <div className='tier'> </div>
            <div className='tier'>{userData}</div>
            {console.log(userData)}
        </>
    )
}

export default User_GameLog