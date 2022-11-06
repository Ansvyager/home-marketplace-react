import { getAuth, updateProfile } from 'firebase/auth'
import react, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'
const Profile = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const { email, name } = formData
  const onLogout = () => {
    auth.signOut()
    navigate('/sign-in')
  }
const onSubmit = async ()=> {
  try {
    if (auth.currentUser.displayName !== name) {
      // update display Name in firebase
      updateProfile(auth.currentUser, {
        displayName: name
      })
      // update in firestore
      const userRef = doc(db, 'users', auth.currentUser.uid)
      await updateDoc(userRef, {
        name
      })
    }
  } catch (error) {
    console.log(error)
    toast.error('Waduhh eror gan, gabisa update detail profil')
  }
}
const onChange = (e)=>{
  setFormData((prevState) => ({
    ...prevState,
    [e.target.id]: e.target.value
  }))
}
  return (
    <div className='profile'>
      <header className="profileHeader">
        <p className="pageHeader">
          Page Header
        </p>
        <button className="logOut" type='button' onClick={onLogout}>LogOut</button>
      </header>
      <main>
        <div className="profileDetailsHeader">
            <p className="profileDetailsText">Personal Details</p>
            <p className="changePersonalDetails" onClick={()=>{
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}>{changeDetails ? 'done' : 'change'}</p>
        </div>
        <div className="profileCard">
          <form >
            <input value={name} onChange={onChange} type="text" className={!changeDetails ? 'profileName' : 'profileNameActive'} id="name" disabled={!changeDetails} />
            <input value={email} onChange={onChange} type="text" className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} id="email" disabled={!changeDetails} />
          </form>
        </div>
      </main>
    </div>
  )
}

export default Profile