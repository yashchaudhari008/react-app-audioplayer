import React from "react";
import "./AudioElement.css";

export default function AudioElement({ data, handleDelete }) {
	return (
		<div className="audioEle">
			<p className="truncate">
				<b>File Name :</b> {data.title}
			</p>
			<audio controls src={data.src}></audio>
			<button onClick={handleDelete}>Delete File</button>
		</div>
	);
}
