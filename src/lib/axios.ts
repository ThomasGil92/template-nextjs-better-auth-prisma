import axios from "axios";

// Créez une instance Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Indicateur pour éviter les boucles infinies
let isRefreshing = false;
interface FailedQueueItem {
    resolve: (value?: string | PromiseLike<string> | undefined) => void;
    reject: (reason?: any) => void;
}

let failedQueue: FailedQueueItem[] = [];

interface ProcessQueueError {
    message?: string;
    [key: string]: any;
}

type ProcessQueueToken = string | null;

const processQueue = (error: ProcessQueueError | null, token: ProcessQueueToken = null): void => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token ?? "");
        }
    });

    failedQueue = [];
};

// Intercepteur de requêtes pour ajouter le header Authorization
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Intercepteur de réponses pour gérer les erreurs 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si ce n'est pas une erreur 401, rejeter immédiatement
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // Pour éviter la boucle sur le endpoint de rafraîchissement
    if (originalRequest._retry) {
      // Rediriger vers la page de connexion
      window.location.href = "/signin";
      return Promise.reject(error);
    }

    // Marquer qu'on a tenté une fois
    originalRequest._retry = true;

    if (isRefreshing) {
      // Si un rafraîchissement est déjà en cours, mettre en pause cette requête
      try {
            const token = await new Promise(function (resolve, reject) {
                failedQueue.push({ resolve, reject });
            });
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return await api(originalRequest);
        } catch (err) {
            return await Promise.reject(err);
        }
    }

    isRefreshing = true;

    // Appel pour rafraîchir le token
    const refreshToken = localStorage.getItem("refresh_token");
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/token`)
        .then(({ data }) => {
          const newToken = data.accessToken;
          localStorage.setItem("jwt", newToken);
          api.defaults.headers.common["Authorization"] = "Bearer " + newToken;
          originalRequest.headers["Authorization"] = "Bearer " + newToken;
          processQueue(null, newToken);
          resolve(api(originalRequest));
        })
        .catch((err) => {
          processQueue(err, null);
          // Rediriger vers la page de connexion si le rafraîchissement échoue
          window.location.href = "/signin";
          reject(err);
        })
        .finally(() => {
          isRefreshing = false;
        });
    });
  },
);

export default api;
