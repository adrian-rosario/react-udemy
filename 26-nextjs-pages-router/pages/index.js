// import { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb"; // will not be part of client side bundle
import Head from "next/head";

// const TEMP_ARR = [
//   {
//     id: 123,
//     image: "console-build.png",
//     title: "small example",
//     address: "abc123",
//   },
// ];

export default function Home(props) {
  /*
  const [theGatherings, setTheGatherings] = useState([]);

  useEffect(() => {
    setTheGatherings(TEMP_ARR);
  }, []);
*/
  return (
    <>
      <Head>
        <title>React Gatherings</title>
        <meta name='description' content='React exercise with Pages Router' />
      </Head>
      <h1>Welcome, friend.</h1>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// - gets called before the component function
// 'will never end up in or be executed by the client
// can be cached and reused
export async function getStaticProps() {
  const connectedClient = await MongoClient.connect(
    "mongodb+srv:..." // add mongo db path w/ credentials
  );

  const theDatabase = connectedClient.db();

  const gatheringCollection = theDatabase.collection("gatherings");

  const theResults = await gatheringCollection.find().toArray();

  // console.log("returned data\n" + JSON.stringify(theResults));

  connectedClient.close();

  return {
    props: {
      meetups: theResults.map((item) => ({
        title: item.title,
        description: item.description,
        image: item.image,
        id: item._id.toString(), // auto generated ID from Mongo needs to be converted
      })), // TEMP_ARR,
      revalidate: 10, // number of seconds NextJS generates, if there are requests
    },
  };
}

// also runs on server only, but generates upon every request
/*
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  // - ie. fetch data from api here
  return {
    props: { meetups: TEMP_ARR },
  };
}
*/
