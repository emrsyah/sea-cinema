export const extractMovieTitle = (title: string) => {
    return decodeURIComponent(title).includes("(dot)") ? decodeURIComponent(title).split("(dot)").join(".") : decodeURIComponent(title)
}