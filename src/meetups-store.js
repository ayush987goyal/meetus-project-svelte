import { writable } from 'svelte/store';

const meetups = writable([]);

const customMeetupStore = {
  subscribe: meetups.subscribe,

  setMeetups: meetupArr => {
    meetups.set(meetupArr);
  },

  addMeetup: meetupData => {
    const newMeetup = {
      ...meetupData
    };

    meetups.update(items => [newMeetup, ...items]);
  },

  updateMeetup: (id, meetupData) => {
    meetups.update(items =>
      items.map(m => {
        if (m.id !== id) return m;

        return { ...m, ...meetupData };
      })
    );
  },

  deleteMeetup: id => {
    meetups.update(items => items.filter(m => m.id !== id));
  },

  toggleFavorite: id => {
    meetups.update(items =>
      items.map(m => {
        if (m.id !== id) return m;

        return { ...m, isFavorite: !m.isFavorite };
      })
    );
  }
};

export default customMeetupStore;
