<script>
  import Header from "./UI/Header.svelte";
  import Button from "./UI/Button.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";

  let meetups = [
    {
      id: "m1",
      title: "Coding Boootcamp",
      subtitle: "Learn code in 2 hours",
      description: "In this meetup, we will teach you coding!",
      imageUrl:
        "https://eventnook.s3.amazonaws.com/u/62366/coverimage_1508244245876_fe_dev_crashcourse_eventnook.png",
      address: "11th Nerd Road, 24432 New York",
      contactEmail: "code@test.com",
      isFavorite: false
    },
    {
      id: "m2",
      title: "Swim Together",
      subtitle: `Let's go for some swimming!`,
      description: "We will simple swi some rounds.",
      imageUrl:
        "https://himanshudixit.me/blog/sites/default/files/inline-images/Google-Summer-of-Code-March-3-2017-800x450%20%283%29_0_0.png",
      address: "11th Nerd Road, 24432 New York",
      contactEmail: "swim@test.com",
      isFavorite: false
    }
  ];

  let editMode;

  function addMeetup(event) {
    const newMeetup = {
      id: Math.random().toString(),
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      description: event.detail.description,
      imageUrl: event.detail.imageUrl,
      address: event.detail.address,
      contactEmail: event.detail.email
    };

    meetups = [newMeetup, ...meetups];
    editMode = null;
  }

  function toggleFavorite(event) {
    const id = event.detail;

    meetups = meetups.map(m => {
      if (m.id !== id) return m;

      return { ...m, isFavorite: !m.isFavorite };
    });
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />

<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:save={addMeetup} />
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>
