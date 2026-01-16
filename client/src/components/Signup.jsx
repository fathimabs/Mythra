import React from 'react'

function Signup() {
  return (

    <div className=''>
      <form>
        <label htmlFor="username">Username</label>
        <input type="text" id='username' name='username' />
        <label htmlFor="email">Email</label>
        <input type="email" id='email' name='email' />
        <label htmlFor="password"></label>
        <input type="password" id='password' name='password' />
        <button className='btn-signup'>Sign-up</button>
      </form>
    </div>
  )
}

export default Signup