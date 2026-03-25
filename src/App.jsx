import React, { useState } from 'react'
import "./Css.css"
import axios from 'axios'

export default function App() {
	let [UserData, setUserData] = useState({})

	function GetUserDeatils(e) {

		let Value = e.target.value//this
		let id = e.target.id//this
		setUserData({ ...UserData, [id]: Value })
	}
	async function submit() {
		let Response = await axios.post("http://localhost:8000/userReg", UserData)
		alert(Response.data.insertId + " Data Insert successfully.")
	}
	return (
		<div>
			<div class="form-box">

				<h3>Register</h3>

				<input onChange={GetUserDeatils} type="email" id="email1" placeholder="Email" required />
				<input onChange={GetUserDeatils} type="text" id="name" placeholder="Username" required />
				<input onChange={GetUserDeatils} type="password" id="password" placeholder="Password" required />

				<div class="btn-group">
					<button onClick={submit} type="submit">Submit</button>
					<button type="reset">Reset</button>
				</div>

			</div>
		</div>
	)
}
