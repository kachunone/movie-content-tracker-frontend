const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export class MovieService {
  static async addMovie(
    moiveData: {
      movieId: number;
      poster: string;
      title: string;
      releaseDate: string;
      overview: string;
      mark: string;
    },
    token: string
  ) {
    const res = await fetch(`${BASE_URL}/user/add-movie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: moiveData.movieId,
        poster_path: moiveData.poster,
        title: moiveData.title,
        release_date: moiveData.releaseDate,
        overview: moiveData.overview,
        mark: moiveData.mark,
      }),
      cache: "no-store",
    });
    return await res.json();
  }

  static async deleteMovie(movieId: number, token: string) {
    const res = await fetch(`${BASE_URL}/user/delete-movie/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    return await res.json();
  }
}
