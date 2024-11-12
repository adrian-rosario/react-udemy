import { useRouter } from "next/router";
import GatheringDetail from "./GatheringDetail";
import { MongoClient, ObjectId } from "mongodb"; // will not be part of client side bundle

export default function Gathering(props) {
  const theRouter = useRouter();
  const pageId = theRouter.query.gatheringId;
  return (
    <GatheringDetail
      title={props.meetupData.title}
      description={props.meetupData.description}
      address={props.meetupData.address}
      image={props.meetupData.image}
    />
  ); // return <GatheringDetail props={{ props }} />
}

// - fetch the data to pre-render pages...
export async function getStaticPaths() {
  const connectedClient = await MongoClient.connect(
    "mongodb+srv:..." // add mongo db path w/ credentials"
  );

  const theDatabase = connectedClient.db();

  const gatheringCollection = theDatabase.collection("gatherings");

  const theResults = await gatheringCollection.find({}, { _id: 1 }).toArray();

  connectedClient.close();

  return {
    fallback: "blocking", // telling nexjs the list of paths might not be exhaustive, there might be more pages
    paths: theResults.map((item) => ({
      params: { gatheringId: item._id.toString() },
    })), // temp, mock data: // [{ params: { gatheringId: "123" } }],
  };
}

export async function getStaticProps(context) {
  const theId = context.params.gatheringId;

  const connectedClient = await MongoClient.connect(
    "mongodb+srv://..." // add mongo db path w/ credentials
  );

  const theDatabase = connectedClient.db();

  const gatheringCollection = theDatabase.collection("gatherings");

  const theResults = await gatheringCollection.findOne({
    _id: new ObjectId(theId),
  });
  console.log("page, findOne data:\n" + JSON.stringify(theResults));
  connectedClient.close();

  // console.log("meetup id from context: " + theId);

  return {
    // - temp, mock single event
    props: {
      meetupData: {
        id: theResults._id.toString(),
        title: theResults.title,
        image: theResults.image,
        description: theResults.description,
        address: theResults.address,
      },

      // mock temp data
      /*
      {
        id: theId,
        image: "console-build.png",
        title: "small example",
        address: "abc123",
        description: "a/b time",
      } */
    },
  };
}
