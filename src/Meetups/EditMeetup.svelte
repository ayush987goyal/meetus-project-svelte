<script>
  import { createEventDispatcher } from "svelte";

  import Modal from "../UI/Modal.svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import { isEmpty, isValidEmail } from "../helpers/validation.js";

  const dispatch = createEventDispatcher();

  let title = "";
  let subtitle = "";
  let imageUrl = "";
  let email = "";
  let address = "";
  let description = "";

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

  function submitForm() {
    dispatch("save", {
      title,
      subtitle,
      imageUrl,
      email,
      address,
      description
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
  </div>
</Modal>
