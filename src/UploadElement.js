import React from "react";
import "./UploadElement.css";

export default function UploadElement({ handleChange }) {
	return (
		<div className="uploadEle">
			<p>
				<b>Upload File :</b>
			</p>
			<input
				type="file"
				name="file"
				onChange={handleChange}
				accept=".mp3,.ogg,.wav"
			></input>
		</div>
	);
}
