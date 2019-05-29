<script>
  import meetups from "./Meetups/meetups-store.js";
  import Header from "./UI/Header.svelte";
  import Button from "./UI/Button.svelte";
  import LoadingSpinner from "./UI/LoadingSpinner.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import { API_URL } from "./config.js";

  let editMode;
  let editedId;
  let page = "overview";
  let pageData = {};
  let isLoading = false;

  isLoading = true;
  fetch(`${API_URL}/meetups.json`)
    .then(res => {
      if (!res.ok) throw "An error occured!";

      return res.json();
    })
    .then(data => {
      isLoading = false;
      const loadedMeetups = [];
      for (let key in data) {
        loadedMeetups.push({ ...data[key], id: key });
      }

      meetups.setMeetups(loadedMeetups);
    })
    .catch(err => {
      isLoading = false;
      console.log(err);
    });

  function saveMeetup() {
    editMode = null;
    editedId = null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null;
  }

  function showDetails(event) {
    page = "details";
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = "overview";
    pageData = {};
  }

  function startEdit(event) {
    editMode = "edit";
    editedId = event.detail;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup id={editedId} on:save={saveMeetup} on:cancel={cancelEdit} />
    {/if}

    {#if isLoading}
      <LoadingSpinner />
    {:else}
      <MeetupGrid
        meetups={$meetups}
        on:showdetails={showDetails}
        on:edit={startEdit}
        on:add={() => (editMode = 'edit')} />
    {/if}
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>
