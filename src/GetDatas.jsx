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

	return (
		<div>
			<table>
				<tr>
					<th>Name</th>
					<th>Email</th>

				</tr>
				<tbody>

					{
						Datas.map(function (values) {
							return <tr>
								<td>{values.name}</td>
								<td>{values.email}</td>
							</tr>
						})
					}
				</tbody>
			</table>
		</div>
	)
}
