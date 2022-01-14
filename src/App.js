import "./App.css";
import AudioElement from "./AudioElement";
import UploadElement from "./UploadElement";
import { db } from "./db.js";
import { useState, useEffect } from "react";

export default function App() {
	const [data, setData] = useState({ title: "", src: null });
	const [fromDatabase, setFromDatabase] = useState(false);

	useEffect(() => {
		// Load data from database.
		db.track.get(1).then((file) => {
			if (!file) return;
			const fileDetails = {
				title: file.title,
				src: file.src,
			};
			setData(fileDetails);
			setFromDatabase(true);
		});
	}, []);

	const handleChange = (event) => {
		const reader = new FileReader();
		const file = event.target.files[0];
		if (file) {
			// Read File as DataURL to store it in database.
			reader.readAsDataURL(file);
		}
		reader.onload = () => {
			const fileDetails = {
				title: file.name,
				src: reader.result,
			};

			// Add data to indexedDB
			db.track.put({ ...fileDetails, id: 1 }).then(() => {
				alert("File Updated In Database");
				event.target.value = "";
			});

			// Updating audio element
			setData(fileDetails);
			setFromDatabase(false);
		};
	};

	const handleDelete = () => {
		// Remove data from indexedDB
		db.track.delete(1).then(() => {
			alert("File Deleted From Database");
			setData({ title: "", src: null });
		});
	};

	return (
		<div className="app">
			<h1>Audio Player</h1>
			<div>
				<UploadElement handleChange={handleChange} />
				{data.src ? (
					<>
						<AudioElement data={data} handleDelete={handleDelete} />
						{fromDatabase && <p className="msg">File Loaded From Database!</p>}
					</>
				) : (
					<p className="msg">Database Empty!</p>
				)}
			</div>
		</div>
	);
}
