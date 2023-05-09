import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore {
  error: ServerError | null = null;
  token: string | null = localStorage.getItem("jwt");
  appLoaded = false;

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.token,
      (token) => this.updateLocalStorage("jwt", token)
    );
  }

  setServerError(error: ServerError) {
    this.error = error;
  }

  setToken = (token: string | null) => {
    this.token = token;
  };

  updateLocalStorage = (key: string, value: string | null) => {
    if (value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  };

  setAppLoaded = () => {
    this.appLoaded = true;
  };
}
