<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";

  const meetups = [
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
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  <MeetupGrid {meetups} />
</main>
