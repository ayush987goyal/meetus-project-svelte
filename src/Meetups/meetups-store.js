import { writable } from 'svelte/store';

const meetups = writable([
  {
    id: 'm1',
    title: 'Coding Boootcamp',
    subtitle: 'Learn code in 2 hours',
    description: 'In this meetup, we will teach you coding!',
    imageUrl:
      'https://eventnook.s3.amazonaws.com/u/62366/coverimage_1508244245876_fe_dev_crashcourse_eventnook.png',
    address: '11th Nerd Road, 24432 New York',
    contactEmail: 'code@test.com',
    isFavorite: false
  },
  {
    id: 'm2',
    title: 'Swim Together',
    subtitle: `Let's go for some swimming!`,
    description: 'We will simple swi some rounds.',
    imageUrl:
      'https://himanshudixit.me/blog/sites/default/files/inline-images/Google-Summer-of-Code-March-3-2017-800x450%20%283%29_0_0.png',
    address: '11th Nerd Road, 24432 New York',
    contactEmail: 'swim@test.com',
    isFavorite: false
  }
]);

const customMeetupStore = {
  subscribe: meetups.subscribe,

  addMeetup: meetupData => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavorite: false
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
