import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AnimeItem from "../../components/AnimeItem/AnimeItem";
import ContentBar from "../../components/UI/ContentBar/ContentBar";
import Loader from "../../components/UI/Loader/Loader";

import { animeAPI } from "../../services/AnimeService";

import hot from "../../assets/hot.png";
import spring from "../../assets/spring.png";
import { AnimeSeasonTypes } from "../../models/AnimeTypes";
import { IAnime } from "../../models/IAnime";
import { AppRoutes } from "../../routing/routes";
import "./HomePage.scss";

const HomePage = () => {
    const [limit, setLimit] = useState<number>(8);
    const navigate = useNavigate();
    const {
        data: animes,
        isLoading,
        error,
    } = animeAPI.useFetchAllAnimeQuery(limit);
    const {
        data: animeSpring,
        isLoading: isSpringAnimeIsLoading,
        error: springAnimeRError,
    } = animeAPI.useFetchAnimeBySeasonQuery(AnimeSeasonTypes.SPRING);

    const showMoreHandler = () => {
        navigate(AppRoutes.ANIME);
    };
    return (
        <section className="anime-main">
            {springAnimeRError ? (
                <h1>Error</h1>
            ) : isSpringAnimeIsLoading ? (
                <Loader />
            ) : (
                animeSpring && (
                    <ContentBar
                        title={"Anime"}
                        img={spring}
                        items={animeSpring as IAnime[]}
                        renderItem={(anime: IAnime) => (
                            <AnimeItem anime={anime} key={anime.title} />
                        )}
                        slider={true}
                    />
                )
            )}

            <div>
                {error ? (
                    <h1>Error</h1>
                ) : isLoading ? (
                    <Loader />
                ) : (
                    animes && (
                        <ContentBar
                            title={"Popular"}
                            img={hot}
                            items={animes as IAnime[]}
                            renderItem={(anime: IAnime) => (
                                <AnimeItem anime={anime} key={anime.title} />
                            )}
                            slider={false}
                            onShowMoreButtonClick={showMoreHandler}
                        />
                    )
                )}
            </div>
        </section>
    );
};

export default HomePage;
