import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function GetDatas() {
	let [Datas, setDatas] = useState([])//?
	async function FetData() {
		let response = await axios.get("http://localhost:8000/GetUser")//promise
		console.log(response.data)
		setDatas(response.data)

	}
	useEffect(function () {
		try {
			FetData()
		}
		catch (err) {
			console.log(err)
		}
	}, [])

	async function DeleteData(UserId) {
		//id
		console.log(UserId)//obj,array,string,number,bool,func.,
		// let Response = await axios.delete("http://localhost:8000/DeleteUser", { id: UserId })
		let Response = await axios.delete("http://localhost:8000/DeleteUser", { data: { id: UserId } })//delete cmd compal.
		//post/put
		//delete compal.

		//use attributes
		console.log(Response)
		FetData()
		// use parameters
	}
	// function UpdateData(id, name, email) {
	// 	let UserId = e.target.id //string,number
	// 	console.log(UserId)
	// }
	async function UpdateData(userdata) {
		// let UserId = e.target.id //string,number
		// console.log(UserId)
		//promt
		let newName = window.prompt("Enter Name", userdata.name)
		let newEmail = window.prompt("Enter Email", userdata.email)

		console.log(userdata, newName, newEmail)
		let obj = {
			id: userdata.id,
			name: newName,
			email: newEmail
		}
		let Response = await axios.put("http://localhost:8000/UpdateUserNameorMail", obj)//delete cmd compal.
		console.log(Response)
				FetData()

	}
	// DeleteData(10)
	return (
		<div>
			<table className='table table-bordered table-hover table-striped m-3 p-3 border-2 border'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Delete</th>
						<th>Update</th>
					</tr>
				</thead>
				<tbody>

					{
						Datas.map(function (values, index) {
							return <tr key={index}>
								<td>{values.name}</td>
								<td>{values.email}</td>
								<td><button onClick={function (e) { DeleteData(values.id) }} className='btn btn-danger'>delete</button></td>
								{/* <td><button id={values.id} onClick={UpdateData} className='text-white btn btn-info'>Update</button></td> */}
								<td><button onClick={function (e) { UpdateData({ id: values.id, name: values.name, email: values.email }) }} className='text-white btn btn-info'>Update</button></td>
								{/* <td><button onClick={function (e) { UpdateData(values.id, values.name, values.email) }} className='text-white btn btn-info'>Update</button></td> */}

							</tr>
						})
					}
				</tbody>
			</table>
		</div>
	)
}
