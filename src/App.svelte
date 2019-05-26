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
</style>

<Header />

<main>
  <Button caption="New Meetup" on:click={() => (editMode = 'add')} />
  {#if editMode === 'add'}
    <EditMeetup />
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>
