import type {ChangeEvent} from "react";


export const Search = () => {
    const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // setSearch(e.currentTarget.value)
        // setCurrentPage(1)
        console.log(e.currentTarget.value)
    }
    return (
        <div>
            <h1>Search</h1>
            <input
                type="search"
                placeholder={'Search movies by title'}
                onChange={searchPlaylistHandler}
            />
        </div>
    )
}