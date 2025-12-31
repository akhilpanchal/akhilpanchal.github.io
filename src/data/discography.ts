// Type definition for media tracks (YouTube and SoundCloud)
export interface MediaTrack {
    platform: 'youtube' | 'soundcloud';
    trackId: string; // YouTube videoId or SoundCloud track URL
    title: string;
    releaseDate?: Date | string;
    description?: string;
    category?: 'original' | 'cover';
    thumbnailUrl?: string; // Optional: For SoundCloud tracks, will be fetched if not provided
}

// Akhil Panchal - Complete Discography
export const discographyData: MediaTrack[] = [
    // Original Singles & Featured Performances
    {
        platform: 'youtube',
        trackId: 'nTp8q9kKF4k',
        title: 'Aankhein (feat. Akhil Panchal)',
        releaseDate: '2023',
        category: 'original',
        description: 'Original Single with Partha Bhattacharya',
    },
    {
        platform: 'youtube',
        trackId: 'QAPO1Sfwkv4',
        title: 'Lamha (feat. Akhil Panchal)',
        releaseDate: '2023',
        category: 'original',
        description: 'Original Single with Partha Bhattacharya',
    },
    {
        platform: 'youtube',
        trackId: 'oamFEtoyGwY',
        title: 'Jeena Sikha Hai',
        releaseDate: '2019-11-03',
        category: 'original',
        description: 'Original single with Kushal Bharatia',
    },
    {
        platform: 'youtube',
        trackId: 'TaDn4ObiEa8',
        title: 'Mujhe Nahi Pata (feat. Akhil Panchal)',
        releaseDate: '2013-07-08',
        category: 'original',
        description: 'Original Single with Partha Bhattacharya',
    },
    {
        platform: 'youtube',
        trackId: 'oWweX5GoSKY',
        title: 'Izhaar (feat. Akhil Panchal)',
        releaseDate: '2013-07-08',
        category: 'original',
        description: 'Original Single with Partha Bhattacharya',
    },
    {
        platform: 'youtube',
        trackId: 'zbGRj8TfnMg',
        title: 'Judaa (feat. Akhil Panchal)',
        releaseDate: '2013-07-08',
        category: 'original',
        description: 'Original Single with Partha Bhattacharya',
    },
    {
        platform: 'youtube',
        trackId: 'u9f8rEkt2PI',
        title: 'Jaane Kyun (feat. Akhil Panchal)',
        releaseDate: '2013-07-08',
        category: 'original',
        description: 'Original Single with Partha Bhattacharya',
    },
    {
        platform: 'youtube',
        trackId: 'dRuFRbAnUfA',
        title: 'Anjaan (feat. Akhil Panchal)',
        releaseDate: '2013-07-08',
        category: 'original',
        description: 'Original Single with Partha Bhattacharya',
    },

    // SoundCloud Tracks
    {
        platform: 'soundcloud',
        trackId: 'https://soundcloud.com/akhilpanchal/nindiya-re-akhil',
        title: 'Nindiya Re - Akhil',
        releaseDate: '2024',
        category: 'cover',
        description: 'Cover of the classic song',
    },
    {
        platform: 'soundcloud',
        trackId: 'https://soundcloud.com/akhilpanchal/khoon-chala-ft-akhil-panchal',
        title: 'Khoon Chala - Akhil Panchal',
        releaseDate: '2024',
        category: 'cover',
        description: 'Cover of the classic song',
    },

    // Live Cover Videos
    {
        platform: 'youtube',
        trackId: 'PQ03BNW8bG8',
        title: 'Hasi Khanakti Hui | Extinguished Happiness',
        releaseDate: '2023',
        category: 'cover',
        description: 'Live cover performance',
    },
    {
        platform: 'youtube',
        trackId: 'dr_KTXmuNQQ',
        title: 'Arijit Singh Medley Cover',
        releaseDate: '2015',
        category: 'cover',
        description: 'Live at SyracuseU Grad School Diwali Celebration',
    },
    {
        platform: 'youtube',
        trackId: 'yHJ9EqSk8ZI',
        title: 'Tu Bhula Jise - Airlift | KK',
        releaseDate: '2023',
        category: 'cover',
        description: 'Live cover of KK\'s classic',
    },
    {
        platform: 'youtube',
        trackId: 'EeYErBuUPFQ',
        title: 'Mujhe Nahi Pata',
        releaseDate: '2023',
        category: 'cover',
        description: 'Live cover with Partha Bhattacharya',
    },
    {
        platform: 'youtube',
        trackId: 'fH440aqGkMQ',
        title: 'Raat Bhar - Modern Love',
        releaseDate: '2023',
        category: 'cover',
        description: 'Vishal Bharadwaj | Meiyang Chang cover',
    },
    {
        platform: 'youtube',
        trackId: 'PGImj8-e45s',
        title: 'O Meri Jaan | KK',
        releaseDate: '2023',
        category: 'cover',
        description: 'Live tribute to KK',
    },
    {
        platform: 'youtube',
        trackId: 'gx36TIKeFNk',
        title: 'Kabhi | Abbas Ali Khan',
        releaseDate: '2023',
        category: 'cover',
        description: 'Live cover performance',
    },
    {
        platform: 'youtube',
        trackId: 'qPIzNCA5BeY',
        title: 'Ik Aarzu | Jal The Band',
        releaseDate: '2023',
        category: 'cover',
        description: 'Live cover with Partha Bhattacharya',
    },
    {
        platform: 'youtube',
        trackId: '__wW0hYPwYw',
        title: 'Dheere Se | The Yellow Diary',
        releaseDate: '2023',
        category: 'cover',
        description: 'Live cover performance',
    },
    {
        platform: 'youtube',
        trackId: "wPyR3OXJl3Q",
        title: 'Bachana | Bilal Khan',
        releaseDate: '2011-08-15',
        category: 'cover',
        description: 'Live cover with Yash Garg',
    }
];

// Helper functions to filter videos by category
export const getOriginalSongs = () =>
    discographyData.filter(track => track.category === 'original');

export const getCoverSongs = () =>
    discographyData.filter(track => track.category === 'cover');

// Sort videos by date (newest first)
export const sortByDate = (tracks: MediaTrack[]) => {
    return [...tracks].sort((a, b) => {
        if (!a.releaseDate) return 1;
        if (!b.releaseDate) return -1;

        const dateA = a.releaseDate instanceof Date ? a.releaseDate : new Date(a.releaseDate);
        const dateB = b.releaseDate instanceof Date ? b.releaseDate : new Date(b.releaseDate);

        return dateB.getTime() - dateA.getTime();
    });
};

// Example: Get all tracks sorted by date
export const getAllTracksSorted = () => sortByDate(discographyData);

// Legacy function for backward compatibility
export const getAllVideosSorted = getAllTracksSorted;
