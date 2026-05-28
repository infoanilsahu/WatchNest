import axios from "axios";

export async function DeleteVideo({
  accountId,
  reqLink,
  videoId,
  playlistId,
  setError,
  setLoading,
}: DeleteVideoProp): Promise<boolean> {
  try {
    setLoading(true);

    const res = await axios({
      method: "DELETE",
      url: reqLink,
      data: {
        accountId,
        videoId,
        playlistId,
      },
    });

    return res.status === 200;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const backendMessage = err.response?.data?.message;

      if (typeof backendMessage === "string") {
        setError(backendMessage);
      } else if (
        backendMessage &&
        typeof backendMessage === "object" &&
        "message" in backendMessage
      ) {
        setError(String(backendMessage.message));
      } else {
        setError(err.message || "Something went wrong");
      }
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Unknown error occurred");
    }

    return false;
  } finally {
    setLoading(false);
  }
}

interface DeleteVideoProp {
  videoId: number;
  accountId: number;
  playlistId: number | null;
  reqLink: string;
  setError: (value: string) => void;
  setLoading: (value: boolean) => void;
}



export async function DeletePlaylist({accountId, playlistId, reqLink, setError, setLoading}: DeletePlaylistProp) {
  try {
    setLoading(true);

    const res = await axios({
      method: "DELETE",
      url: reqLink,
      data: {
        accountId,
        playlistId,
      },
    });

    return res.status === 200;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const backendMessage = err.response?.data?.message;

      if (typeof backendMessage === "string") {
        setError(backendMessage);
      } else if (
        backendMessage &&
        typeof backendMessage === "object" &&
        "message" in backendMessage
      ) {
        setError(String(backendMessage.message));
      } else {
        setError(err.message || "Something went wrong");
      }
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Unknown error occurred");
    }

    return false;
  } finally {
    setLoading(false);
  }
}

interface DeletePlaylistProp {
  playlistId: number;
  accountId: number;
  reqLink: string;
  setError: (value: string) => void;
  setLoading: (value: boolean) => void;
}