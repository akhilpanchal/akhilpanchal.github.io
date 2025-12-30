// Type definition for YouTube video data
export interface YouTubeVideo {
    videoId: string;
    title: string;
    releaseDate?: Date | string;
    description?: string;
    category?: 'original' | 'cover';
}

// Akhil Panchal - Complete Discography
export const discographyData: YouTubeVideo[] = [
    // Original Singles & Featured Performances
    {
        videoId: 'nTp8q9kKF4k',
        title: 'Aankhein (feat. Akhil Panchal)',
        releaseDate: '2023',
        category: 'original',
        description: 'Original Single with Partha Bhattacharya',
    },
    {
        videoId: 'QAPO1Sfwkv4',
        title: 'Lamha (feat. Akhil Panchal)',
        releaseDate: '2023',
        category: 'original',
        description: 'Original Single with Partha Bhattacharya',
    },
    {
        videoId: 'oamFEtoyGwY',
        title: 'Jeena Sikha Hai',
        releaseDate: '2019-11-03',
        category: 'original',
        description: 'Original single with Kushal Bharatia',
    },
    {
        videoId: 'TaDn4ObiEa8',
        title: 'Mujhe Nahi Pata (feat. Akhil Panchal)',
        releaseDate: '2013-07-08',
        category: 'original',
        description: 'Original Single with Partha Bhattacharya',
    },
    {
        videoId: 'oWweX5GoSKY',
        title: 'Izhaar (feat. Akhil Panchal)',
        releaseDate: '2013-07-08',
        category: 'original',
        description: 'Original Single with Partha Bhattacharya',
    },
    {
        videoId: 'zbGRj8TfnMg',
        title: 'Judaa (feat. Akhil Panchal)',
        releaseDate: '2013-07-08',
        category: 'original',
        description: 'Original Single with Partha Bhattacharya',
    },
    {
        videoId: 'u9f8rEkt2PI',
        title: 'Jaane Kyun (feat. Akhil Panchal)',
        releaseDate: '2013-07-08',
        category: 'original',
        description: 'Original Single with Partha Bhattacharya',
    },
    {
        videoId: 'dRuFRbAnUfA',
        title: 'Anjaan (feat. Akhil Panchal)',
        releaseDate: '2013-07-08',
        category: 'original',
        description: 'Original Single with Partha Bhattacharya',
    },

    // Live Cover Videos
    {
        videoId: 'PQ03BNW8bG8',
        title: 'Hasi Khanakti Hui | Extinguished Happiness',
        releaseDate: '2023',
        category: 'cover',
        description: 'Live cover performance',
    },
    {
        videoId: 'dr_KTXmuNQQ',
        title: 'Arijit Singh Medley Cover',
        releaseDate: '2015',
        category: 'cover',
        description: 'Live at SyracuseU Grad School Diwali Celebration',
    },
    {
        videoId: 'yHJ9EqSk8ZI',
        title: 'Tu Bhula Jise - Airlift | KK',
        releaseDate: '2023',
        category: 'cover',
        description: 'Live cover of KK\'s classic',
    },
    {
        videoId: 'EeYErBuUPFQ',
        title: 'Mujhe Nahi Pata',
        releaseDate: '2023',
        category: 'cover',
        description: 'Live cover with Partha Bhattacharya',
    },
    {
        videoId: 'fH440aqGkMQ',
        title: 'Raat Bhar - Modern Love',
        releaseDate: '2023',
        category: 'cover',
        description: 'Vishal Bharadwaj | Meiyang Chang cover',
    },
    {
        videoId: 'PGImj8-e45s',
        title: 'O Meri Jaan | KK',
        releaseDate: '2023',
        category: 'cover',
        description: 'Live tribute to KK',
    },
    {
        videoId: 'gx36TIKeFNk',
        title: 'Kabhi | Abbas Ali Khan',
        releaseDate: '2023',
        category: 'cover',
        description: 'Live cover performance',
    },
    {
        videoId: 'qPIzNCA5BeY',
        title: 'Ik Aarzu | Jal The Band',
        releaseDate: '2023',
        category: 'cover',
        description: 'Live cover with Partha Bhattacharya',
    },
    {
        videoId: '__wW0hYPwYw',
        title: 'Dheere Se | The Yellow Diary',
        releaseDate: '2023',
        category: 'cover',
        description: 'Live cover performance',
    },
];

// Helper functions to filter videos by category
export const getOriginalSongs = () =>
    discographyData.filter(video => video.category === 'original');

export const getCoverSongs = () =>
    discographyData.filter(video => video.category === 'cover');

// Sort videos by date (newest first)
export const sortByDate = (videos: YouTubeVideo[]) => {
    return [...videos].sort((a, b) => {
        if (!a.releaseDate) return 1;
        if (!b.releaseDate) return -1;

        const dateA = a.releaseDate instanceof Date ? a.releaseDate : new Date(a.releaseDate);
        const dateB = b.releaseDate instanceof Date ? b.releaseDate : new Date(b.releaseDate);

        return dateB.getTime() - dateA.getTime();
    });
};

// Example: Get all videos sorted by date
export const getAllVideosSorted = () => sortByDate(discographyData);
