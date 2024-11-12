import { MongoClient } from "mongodb";
// /api/new-gathering

// the function name is not reserved as long as it's exported
export default async function handlePathRequest(theRequest, theResponse) {
  if (theRequest.method === "POST") {
    const theData = theRequest.body;

    // const { title, imaeg, address, description } = theData;

    // add try/catch to handle errors

    const connectedClient = await MongoClient.connect(
      "mongodb+srv:..." // add mongo db path w/ credentials
    );

    const theDatabase = connectedClient.db();

    const gatheringCollection = theDatabase.collection("gatherings");

    const theResult = await gatheringCollection.insertOne(theData); // insert one new document into the collection

    console.log("the db result:\n" + JSON.stringify(theResult));

    theResponse.status(201).json({ message: "Data inserted successfully" });
  }
}
