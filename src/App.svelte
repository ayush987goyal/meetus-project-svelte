<script>
  import Header from "./UI/Header.svelte";
  import MeetupItem from "./Meetups/MeetupItem.svelte";

  const meetups = [
    {
      id: "m1",
      title: "Coding Boootcamp",
      subtitle: "Learn code in 2 hours",
      description: "In this meetup, we will teach you coding!",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN_EU45_muU_KUWbA_Q8VjGjYzVg3hFMM6tPi_eHug7L0Hp4Ur",
      address: "11th Nerd Road, 24432 New York",
      contactEmail: "code@test.com"
    },
    {
      id: "m2",
      title: "Swim Together",
      subtitle: `Let's go for some swimming!`,
      description: "We will simple swi some rounds.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG9SUDFdiPXhwjeDuu87b0RHOcX48NqbW41xIPlw_eJyuDgi9d8A",
      address: "11th Nerd Road, 24432 New York",
      contactEmail: "swim@test.com"
    }
  ];
</script>

<style>
  .meetups {
    margin-top: 5rem;
  }
</style>

<Header />

<section class="meetups">
  {#each meetups as meetup}
    <MeetupItem />
  {/each}
</section>
