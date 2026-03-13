import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

export default function Form() {
	let [UserData, setUserData] = useState({})
	let [ApiData, setApiData] = useState([])

	async function SubmitData() {
		let result = await axios.post("http://localhost:8001/AddStudent", UserData)//200 success
		let response = result.data

		alert(response.Message + response.RecordCount)
		//data
		setApiData(response.Data)

	}

	// dynmic Form Value Get

	function GetValue(e) {
		let id = e.target.id
		let value = e.target.value

		let obj = {
			[id]: value
		}
		console.log(obj)
		setUserData({ ...UserData, ...obj })

	}


	return (
		<div>
			<input type="text" onChange={GetValue} name="" placeholder='Enter name...' id="name" /><br />
			<input type="text" onChange={GetValue} name="" placeholder='Enter age...' id="age" /><br />
			<input type="text" onChange={GetValue} name="" placeholder='Enter city...' id="city" /><br />
			<button onClick={SubmitData}>Save</button>

			<table className='table'>
				<tr>
					<td>Name</td>
					<td>age</td>
					<td>city</td>
				</tr>
				{
					ApiData.map(function (val) {
						return <tr>
							<td>{val.name}</td>
							<td>{val.age}</td>
							<td>{val.city}</td>
						</tr>
					})
				}
			</table>

		</div>
	)
}
