import axios from "axios";
import React, { useEffect, useState } from "react";

export default function App() {
	async function submitData() {
		//api Run
		// fetch("http://localhost:8001/StudentData").then().catch()
		let Response = await fetch("http://localhost:8001/StudentData", {
			method: "get"
		})//Get Api
		let Result = await Response.json()
		console.log(Result)
		// axious
		// ajax
	}

	// POST

	// useEffect(async()=>{
	// 	//logic run on refersh time
	// 	let Response = await fetch("http://localhost:8001/AddStudent", {
	// 		// method:"update"
	// 		// method:"delete"
	// 		method: "post",
	// 		body: JSON.stringify({
	// 			"id": 51,
	// 			"name": "Pankaj",
	// 			"age": 25,
	// 			"city": "Rohtak",
	// 			"state": "Haryana",
	// 			"course": "MCA",
	// 			"email": "Pankaj@gmail.com"
	// 		}),
	// 		"content-type":"Application/json"
	// 	})//Post Api
	// 	let Result = await Response.json()
	// 	console.log(Result)

	// },[])
	async function MyPostApi() {
		let Response = await fetch("http://localhost:8001/AddStudent", {//Airport
			// method:"update"
			// method:"delete"
			method: "post",//resone for go to foren
			"content-type": "Application/json",//ticket/Visa
			body: JSON.stringify({
				"id": 51,
				"name": "Pankaj",
				"age": 25,
				"city": "Rohtak",
				"state": "Haryana",
				"course": "MCA",
				"email": "Pankaj@gmail.com"
			}),
		})//Post Api//arived Airport
		let Result = await Response.json()
		console.log(Result)

		//70%
		// line of code ko high
		//axios (line of code less,fast,easy to use,given more securties.....)
	}
	async function MyGetApiWithAxios() {
		//package install
		let result = await axios.get("http://localhost:8001/StudentData")
		console.log(result)
	}
	async function MyPostApiWithAxios() {
		//package install
		let result = await axios.post("http://localhost:8001/AddStudent", {
			"id": 51,
			"name": "Pankaj",
			"age": 25,
			"city": "Rohtak",
			"state": "Haryana",
			"course": "MCA",
			"email": "Pankaj@gmail.com"
		})
		console.log(result)
	}
	return (
		<div>

			<button onClick={submitData}>Get Api</button>
			<button onClick={MyPostApi}>Post Api</button>
			<button onClick={MyGetApiWithAxios}>Get Api with axios</button>
			<button onClick={MyPostApiWithAxios}>Get Post with axios</button>
		</div>
	);
}



// when u wanna create any obj or array in json formate then you will have to use JSON.stringify()