
export const movieSections = {
    popular: {
        title: "Popular Movies",
        endpoint: "movie/popular",
        viewMoreLink: "/category?type=popular"
    },
    top_rated: {
        title: "Top Rated Movies",
        endpoint: "movie/top_rated",
        viewMoreLink: "/category?type=top_rated"
    },
    upcoming: {
        title: "Upcoming Movies",
        endpoint: "movie/upcoming",
        viewMoreLink: "/category?type=upcoming"
    },
    now_playing: {
        title: "Now Playing",
        endpoint: "movie/now_playing",
        viewMoreLink: "/category?type=now_playing"
    }
};

export const getMovieSectionConfig = (type: string) => {
    return movieSections[type as keyof typeof movieSections] || movieSections.popular;
};