<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import TextInput from "./UI/TextInput.svelte";

  let title = "";
  let subtitle = "";
  let imageUrl = "";
  let email = "";
  let address = "";
  let description = "";

  let meetups = [
    {
      id: "m1",
      title: "Coding Boootcamp",
      subtitle: "Learn code in 2 hours",
      description: "In this meetup, we will teach you coding!",
      imageUrl:
        "https://eventnook.s3.amazonaws.com/u/62366/coverimage_1508244245876_fe_dev_crashcourse_eventnook.png",
      address: "11th Nerd Road, 24432 New York",
      contactEmail: "code@test.com"
    },
    {
      id: "m2",
      title: "Swim Together",
      subtitle: `Let's go for some swimming!`,
      description: "We will simple swi some rounds.",
      imageUrl:
        "https://himanshudixit.me/blog/sites/default/files/inline-images/Google-Summer-of-Code-March-3-2017-800x450%20%283%29_0_0.png",
      address: "11th Nerd Road, 24432 New York",
      contactEmail: "swim@test.com"
    }
  ];

  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString(),
      title,
      subtitle,
      description,
      imageUrl,
      address,
      contactEmail: email
    };

    meetups = [newMeetup, ...meetups];
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
    <TextInput
      id="title"
      label="Title"
      type="text"
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      type="text"
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      id="address"
      label="Address"
      type="text"
      value={address}
      on:input={event => (address = event.target.value)} />
    <TextInput
      id="imageUrl"
      label="Image URL"
      type="text"
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      id="email"
      label="E-Mail"
      type="email"
      value={email}
      on:input={event => (email = event.target.value)} />
    <TextInput
      controlType="textarea"
      rows="3"
      id="description"
      label="Description"
      value={description}
      on:input={event => (description = event.target.value)} />

    <button type="submit">Save</button>
  </form>

  <MeetupGrid {meetups} />
</main>
