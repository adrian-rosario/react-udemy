import { useRouter } from "next/router";
import NewMeetupForm from "../../../components/meetups/NewMeetupForm";
import Head from "next/head";

export default function NewGathering() {
  const routterHook = useRouter();

  const handleNewGathering = async (newData) => {
    // console.log(JSON.stringify(newData));
    const theResponse = await fetch("/api/new-gathering", {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "Content-type": "application/json",
      },
    });

    const responseData = await theResponse.json();

    console.log("the server response:\n" + JSON.stringify(responseData));

    routterHook.push("/");
  };

  return (
    <>
      <Head>
        <title>Add a new Gathering</title>
      </Head>
      <h1>New Gathering</h1>
      <NewMeetupForm onAddMeetup={handleNewGathering} />
    </>
  );
}
