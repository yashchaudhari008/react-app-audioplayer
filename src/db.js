import Dexie from "dexie";

export const db = new Dexie("Audios");
db.version(1).stores({
	track: "&id",
});
db.open();
