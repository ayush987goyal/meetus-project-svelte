<script>
  import { createEventDispatcher } from "svelte";

  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";

  const dispatch = createEventDispatcher();

  let title = "";
  let subtitle = "";
  let imageUrl = "";
  let email = "";
  let address = "";
  let description = "";

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
</script>

<style>
  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<form on:submit|preventDefault={submitForm}>
  <TextInput
    id="title"
    label="Title"
    value={title}
    on:input={event => (title = event.target.value)} />
  <TextInput
    id="subtitle"
    label="Subtitle"
    value={subtitle}
    on:input={event => (subtitle = event.target.value)} />
  <TextInput
    id="address"
    label="Address"
    value={address}
    on:input={event => (address = event.target.value)} />
  <TextInput
    id="imageUrl"
    label="Image URL"
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

  <Button type="submit">Save</Button>
</form>