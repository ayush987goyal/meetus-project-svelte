<script context="module">
  import { API_URL } from "../config.js";

  export async function preload(page) {
    try {
      const res = await this.fetch(`${API_URL}/meetups.json`);
      if (!res.ok) throw "An error occured!";

      const data = await res.json();

      const loadedMeetups = [];
      for (let key in data) {
        loadedMeetups.push({ ...data[key], id: key });
      }

      return { fetchedMeetups: loadedMeetups.reverse() };
    } catch (err) {
      console.log(err);
      this.error(500, "Could not fetch meetups!");
    }
  }
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";

  import MeetupItem from "../components/Meetup/MeetupItem.svelte";
  import MeetupFilter from "../components/Meetup/MeetupFilter.svelte";
  import EditMeetup from "../components/Meetup/EditMeetup.svelte";
  import LoadingSpinner from "../components/UI/LoadingSpinner.svelte";
  import Button from "../components/UI/Button.svelte";
  import meetupStore from "../meetups-store.js";

  export let fetchedMeetups;

  let meetups = [];
  let favsOnly = false;
  let editMode;
  let editedId;
  let isLoading = false;
  let unsubscribe;

  $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups;

  onMount(() => {
    console.log("mount", fetchedMeetups);
    unsubscribe = meetupStore.subscribe(items => {
      meetups = items;
    });
    meetupStore.setMeetups(fetchedMeetups);
  });

  onDestroy(unsubscribe);

  function setFilter(event) {
    favsOnly = event.detail === 1;
  }

  function saveMeetup() {
    editMode = null;
    editedId = null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null;
  }

  function startEdit(event) {
    editMode = "edit";
    editedId = event.detail;
  }

  function startAdd() {
    editMode = "edit";
  }
</script>

<style>
  .meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  .meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  .no-meetups {
    margin: 1rem;
  }

  @media (min-width: 768px) {
    .meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<svelte:head>
  <title>All Meetups</title>
</svelte:head>

{#if editMode === 'edit'}
  <EditMeetup id={editedId} on:save={saveMeetup} on:cancel={cancelEdit} />
{/if}

{#if isLoading}
  <LoadingSpinner />
{:else}
  <section class="meetup-controls">
    <MeetupFilter on:select={setFilter} />
    <Button on:click={startAdd}>New Meetup</Button>
  </section>

  {#if filteredMeetups.length === 0}
    <p class="no-meetups">No meetups found, you can start adding some.</p>
  {:else}
    <section class="meetups">
      {#each filteredMeetups as meetup (meetup.id)}
        <div transition:scale animate:flip={{ duration: 300 }}>
          <MeetupItem
            id={meetup.id}
            title={meetup.title}
            subtitle={meetup.subtitle}
            imageUrl={meetup.imageUrl}
            description={meetup.description}
            address={meetup.address}
            email={meetup.contactEmail}
            isFav={meetup.isFavorite}
            on:edit={startEdit} />
        </div>
      {/each}
    </section>
  {/if}
{/if}
