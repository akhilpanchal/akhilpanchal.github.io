import type { AaiContent } from './types';

export const content: AaiContent = {
    meta: {
        title: "Aai's Recovery Journal",
        description: "Songs and moments from my mother's eye surgery recovery journey"
    },
    intro: {
        heading: "Aai's Recovery Journal",
        subheading: "A timeline of songs, love, and healing through music"
    },
    timeline: [
        {
            id: 'pre-surgery',
            type: 'milestone',
            date: 'October 27, 2025',
            title: 'Before Surgery',
            note: 'Ready for the procedure. This photo was taken by my mother-in-law, who was a great support during this time 🤍.',
            photo: '/aai/images/pre-surgery.jpg',
            photoAlt: 'Before eye surgery'
        },
        {
            id: 'post-surgery',
            type: 'milestone',
            date: 'October 30, 2025',
            title: 'The Surgery',
            note: '1st couple days after the surgery were rough. Day 3 looked much better. Now begins the journey of healing and patience.',
            photo: '/aai/images/post-surgery.jpg',
            photoAlt: 'Just after the surgery'
        },
        {
            id: 'recovery-photo',
            type: 'milestone',
            date: 'November 5, 2025',
            title: 'Not Over Yet',
            note: 'Condition improving, but the retinal break is still open. Gas Injection + Laser procedure performed.\
            She has to stay in this position for 18 hours a day for ~2 weeks to aid healing. \
            This setup with pillows made by my father demonstrates his *jugaad* skills that kept her comfortable! \
            Small victories felt very significant.',
            photo: '/aai/images/recovery.jpg',
            photoAlt: 'During recovery'
        },
        {
            id: 'song-1',
            type: 'song',
            date: 'November 9, 2025',
            title: 'Chhota Sa Balma',
            note: 'The first song after surgery. A playful, light-hearted tune. You could hear the smile in her voice – the spark returning.',
            audio: '/aai/voice-notes/3 - Chhota Sa Balma.m4a'
        },
        {
            id: 'song-2',
            type: 'song',
            date: 'November 10, 2025',
            title: 'Meri Jaan Mujhe Jaan Na Kaho',
            note: 'Growing stronger with each note. This classic tune reminded us all of her dedication and the joy she finds in every melody.',
            audio: '/aai/voice-notes/2 - Meri Jaan Mujhe Jaan Na Kaho.m4a'
        },
        {
            id: 'song-5',
            type: 'song',
            date: 'November 10, 2025',
            title: 'Tu Hai Toh',
            note: 'One of my recent favorites. Her voice carries hope, even through the fragility of recovery. The strength in her singing grows with each passing day.',
            audio: '/aai/voice-notes/1 - Tu Hai Toh.m4a'
        },
        {
            id: 'recovery-update-2',
            type: 'text',
            date: 'November 11, 2025',
            title: 'Another session of laser',
            note: 'Condition continues to improve. But still not where it needs to be. Another session of Laser procedure performed.'
        },
        {
            id: 'song-3',
            type: 'song',
            date: 'November 12, 2025',
            title: 'Yeh Raatein',
            note: 'Full of emotion and strength. Each note carries the weight of her journey and the hope of healing.',
            audio: '/aai/voice-notes/4 - Yeh Raatein.m4a'
        },
        {
            id: 'song-4',
            type: 'song',
            date: 'November 13, 2025',
            title: 'Betaab Dil Ki Tamanna',
            note: 'A beautiful melody that showcases her growing confidence. Each day brings more strength to her voice.',
            audio: '/aai/voice-notes/5 - Betaab Dil Ki Tamanna.m4a'
        },
        {
            id: 'song-7',
            type: 'song',
            date: 'November 13, 2025',
            title: 'Kehna Hi Kya',
            note: 'A soulful rendition of this AR Rahman classic. Her voice carries the depth and emotion that only comes from truly feeling the music.',
            audio: '/aai/voice-notes/7 - Kehna Hi Kya.m4a'
        },
        {
            id: 'song-6',
            type: 'song',
            date: 'November 14, 2025',
            title: 'Hum Dil De Chuke Sanam',
            note: 'One of her favorites. The passion in this classic shines through, reminding us why she fell in love with music.',
            audio: '/aai/voice-notes/6 - Hum Dil De Chuke Sanam.m4a'
        },
        {
            id: 'song-8',
            type: 'song',
            date: 'November 15, 2025',
            title: 'Sapna Jahan',
            note: 'A dreamy, hopeful tune to complete the collection. This marks her full return to the joy of singing.',
            audio: '/aai/voice-notes/8 - Sapna Jahan.m4a'
        },
        {
            id: 'students-wishes',
            type: 'video',
            date: 'November 22, 2025',
            title: 'Love from Her Music Family',
            note: 'Her fellow students from the music class sent this heartwarming message, letting her know she was missed and loved.',
            video: '/aai/videos/students-wishes.mp4'
        },
        {
            id: 'friend-tribute',
            type: 'video',
            date: 'January 10, 2026',
            title: "A Friend's Tribute",
            note: 'Her good friend Savita created this beautiful tribute using one of her recordings. The community of music she built is a testament to her spirit.',
            video: '/aai/videos/friend-tribute.mp4'
        },
        {
            id: 'back-to-live-singing',
            type: 'video',
            date: 'January 11, 2026',
            title: "Back to Live Singing",
            note: 'She performed at The Orange - Art & Book Cafe in Pune. After her performance, an audience member requested her to sing something in Marathi.\
            Checkout her Youtube Channel for more such performances!',
            youtube: 't0mbQKUmtO0'
        },

    ],
    ui: {
        playAll: 'Play all 8 songs',
        clickToExpand: 'Click to view full image',
        loading: 'Loading...',
        playing: 'Now playing',
        paused: 'Paused',
        languageLabel: 'Language'
    }
};
