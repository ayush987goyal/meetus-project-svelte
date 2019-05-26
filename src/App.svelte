<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";

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
</style>

<Header />

<main>
  <form on:submit|preventDefault={addMeetup}>
    <div class="form-control">
      <label for="title">Title</label>
      <input type="text" id="title" bind:value={title} />
    </div>
    <div class="form-control">
      <label for="subtitle">Subtitle</label>
      <input type="text" id="subtitle" bind:value={subtitle} />
    </div>
    <div class="form-control">
      <label for="address">Address</label>
      <input type="text" id="address" bind:value={address} />
    </div>
    <div class="form-control">
      <label for="imageUrl">Image URL</label>
      <input type="text" id="imageUrl" bind:value={imageUrl} />
    </div>
    <div class="form-control">
      <label for="email">E-Mail</label>
      <input type="email" id="email" bind:value={email} />
    </div>
    <div class="form-control">
      <label for="description">description</label>
      <textarea rows="3" id="description" bind:value={description} />
    </div>

    <button type="submit">Save</button>
  </form>

  <MeetupGrid {meetups} />
</main>
