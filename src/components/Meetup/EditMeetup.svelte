<script>
  import { createEventDispatcher } from "svelte";

  import meetups from "./meetups-store.js";
  import Modal from "../UI/Modal.svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import { isEmpty, isValidEmail } from "../helpers/validation.js";
  import { API_URL } from "../config.js";

  export let id = null;

  let title = "";
  let subtitle = "";
  let imageUrl = "";
  let email = "";
  let address = "";
  let description = "";

  if (id) {
    const unsubscribe = meetups.subscribe(items => {
      const selectedMeetup = items.find(item => item.id === id);

      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      imageUrl = selectedMeetup.imageUrl;
      email = selectedMeetup.contactEmail;
      address = selectedMeetup.address;
      description = selectedMeetup.description;
    });

    unsubscribe();
  }

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: emailValid = !isEmpty(email) && isValidEmail(email);
  $: addressValid = !isEmpty(address);
  $: descriptionValid = !isEmpty(description);
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    imageUrlValid &&
    emailValid &&
    addressValid &&
    descriptionValid;

  const dispatch = createEventDispatcher();

  function submitForm() {
    const meetupData = {
      title,
      subtitle,
      imageUrl,
      address,
      description,
      contactEmail: email
    };

    if (id) {
      fetch(`${API_URL}/meetups/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify(meetupData),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          if (!res.ok) throw "An error occured!";

          meetups.updateMeetup(id, meetupData);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      fetch(`${API_URL}/meetups.json`, {
        method: "POST",
        body: JSON.stringify({ ...meetupData, isFavorite: false }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          if (!res.ok) throw "An error occured!";

          return res.json();
        })
        .then(data => {
          meetups.addMeetup({
            ...meetupData,
            isFavorite: false,
            id: data.name
          });
        })
        .catch(err => {
          console.log(err);
        });
    }

    dispatch("save");
  }

  function deleteMeetup() {
    fetch(`${API_URL}/meetups/${id}.json`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw "An error occured!";

        meetups.deleteMeetup(id);
        dispatch("save");
      })
      .catch(err => {
        console.log(err);
      });
  }

  function onCancel() {
    dispatch("cancel");
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title"
      valid={titleValid}
      validityMessage="Please enter a valid title."
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle."
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      id="address"
      label="Address"
      valid={addressValid}
      validityMessage="Please enter a valid address."
      value={address}
      on:input={event => (address = event.target.value)} />
    <TextInput
      id="imageUrl"
      label="Image URL"
      valid={imageUrlValid}
      validityMessage="Please enter a valid image URL."
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      id="email"
      label="E-Mail"
      type="email"
      valid={emailValid}
      validityMessage="Please enter a valid email."
      value={email}
      on:input={event => (email = event.target.value)} />
    <TextInput
      controlType="textarea"
      rows="3"
      id="description"
      valid={descriptionValid}
      validityMessage="Please enter a valid description."
      label="Description"
      bind:value={description} />
  </form>

  <div slot="footer">
    <Button type="button" mode="outline" on:click={onCancel}>Cancel</Button>
    <Button type="button" disabled={!formIsValid} on:click={submitForm}>
      Save
    </Button>
    {#if id}
      <Button type="button" on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>
