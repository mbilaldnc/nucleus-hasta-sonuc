const docs = require("@googleapis/docs");
const util = require("util");

async function main() {
	const auth = new docs.auth.GoogleAuth({
		keyFilename: "nucleus-hasta-sonuc-280b8124794c.json",
		// Scopes can be specified either as an array or as a single, space-delimited string.
		scopes: ["https://www.googleapis.com/auth/documents"],
	});
	const authClient = await auth.getClient();

	const client = await docs.docs({
		version: "v1",
		auth: authClient,
	});

	// const createResponse = await client.documents.create({
	// 	requestBody: {
	// 		title: "Your new document!",
	// 	},
	// });

	// console.log(createResponse.data);

	const res = await client.documents.get({
		documentId: "1XIsnBdFMJr8ntW8NnSPO7jr5OsYZpOx0M5NKUvpnnxI",
	});
	console.log(util.inspect(res.data, false, 17));
	return res.data;
}
main().catch(console.error);

//1Q4C8ES-st3KARB1m6CQ8ee9TX-BoNbJRKg8yryOEgCQ
