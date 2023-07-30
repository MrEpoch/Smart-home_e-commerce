import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Cookies from "js-cookie";
import { Product } from "./Types";

export const request_url = "http://localhost:3248/server";
export const request_data_url = "http://localhost:3247/server/data";

export const LogIn = async (
  name: string,
  password: string,
): Promise<any | void> => {
  try {
    const { data } = await axios.post(request_url + "/normal-login", {
      name,
      password,
    });
    await Cookies.set("refresh_token", data.REFRESH_TOKEN, {
      expires: 1,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    return data.user;
  } catch (e) {
    handle_err(e);
    return;
  }
};

export const LogOut = async (): Promise<void> => {
  try {
    const cookie: string | null = await Cookies.get("refresh_token");
    if (!cookie) return;
    await Cookies.remove("refresh_token");
    return;
  } catch (e) {
    throw new Error("Error logging out");
  }
};

export const CreateAccount = async (
  name: string,
  password: string,
  email: string,
  phone: string,
  address: string,
  city: string,
  postalCode: string,
  country: string,
): Promise<any> => {
  try {
    const { data } = await axios.post(request_url + "/normal-signup", {
      name: name,
      password: password,
      email: email,
      phone: phone,
      address: address,
      city: city,
      postalCode: postalCode,
      country: country,
    });

    await Cookies.set("refresh_token", data.REFRESH_TOKEN, {
      expires: 1,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return data;
  } catch (e) {
    handle_err(e);
    throw new Error("error");
  }
};

export const GetAccount = async () => {
  try {
    const cookie: string | null = await Cookies.get("refresh_token");
    if (!cookie) {
      LogOut();
      return;
    }

    const access_token = await axios.get(request_url + "/normal-token", {
      headers: { Authorization: `Bearer ${cookie}` },
    });

    const { data } = await axios.get(request_url + "/normal-api/account", {
      headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` },
    });
    return data;
  } catch (e) {
    handle_err(e);
    throw new Error("error");
  }
};

export const GetProducts = async (skip: number): Promise<Array<Product>> => {
  try {
    const { data } = await axios.get(request_data_url + "/?take=10&skip=" + skip);
    return data;
  } catch (e) {
    throw new Error("error");
  }
};

export const GetProduct = async (id: string): Promise<Product> => {
  try {
    const { data } = await axios.get(request_data_url + "/" + id);
    return data;
  } catch (e) {
    throw new Error("error");
  }
};

export const UpdateFavourites = async (favourites: string[]): Promise<void> => {
  try {
    const cookie = await Cookies.get("refresh_token");
    if (!cookie) {
      LogOut();
      return;
    }

    const access_token = await axios.get(request_url + "/normal-token", {
        headers: { Authorization: `Bearer ${cookie}` },
    });

    await axios.put(
      request_url + "/normal-api/favourites",
      { favourites },
      {
        headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` },
      },
    );
    return;
  } catch (e) {
    handle_err(e);
    throw new Error("error");
  }
};

type Checkout_response = {
  url: string;
};

export async function Checkout_payment(
  order: Array<Product>,
): Promise<void | Checkout_response> {
    try {
    const cookie = await Cookies.get("refresh_token");
    const access_token = await axios.get(request_url + "/normal-token", {
        headers: { Authorization: `Bearer ${cookie}` },
    });

    const { data } = await axios.post(
      request_url + "/normal-api/checkout",
      { order: order },
      {
        headers: { Authorization: `Bearer ${access_token.data.ACCESS_TOKEN}` },
      },
    );
    return data;
  } catch (e) {
    handle_err(e);
    throw new Error("Error handling checkout");
  }
}

async function handle_err(e: any): Promise<void> {
  if (e === undefined || e.response === undefined) return;
  const condition =
    typeof e === "object" && Object.keys(e.response).includes("data");
  switch (true) {
    case condition && e.response.data.message === "TokenExpiredError":
      await LogOut();
      window.location.pathname = "/";
      break;
    case condition && e.response.data.message === "JsonWebTokenError":
      await LogOut();
      window.location.pathname = "/";
      break;
    case condition && e.response.data.message === "NotBeforeError":
      await LogOut();
      window.location.pathname = "/";
      break;
  }
  if (condition && e.response.data.message === "TokenExpiredError") {
    await LogOut();
    window.location.pathname = "/";
  }
  return;
}

async function handle_case_error(e: any): Promise<void> {
  if (e === undefined || e.response === undefined) return;
  const condition =
    typeof e === "object" && Object.keys(e.response).includes("data");
  switch (e.response.data) {
    case condition && e.response.data.name === "TokenExpiredError":
      await LogOut();
      window.location.pathname = "/";
      break;
    case condition && e.response.data.name === "JsonWebTokenError":
      await LogOut();
      window.location.pathname = "/";
      break;
    case condition && e.response.data.name === "NotBeforeError":
      await LogOut();
      window.location.pathname = "/";
      break;
    case condition && e.response.data.name === "getProductsErr":
      break;
    case condition && e.response.data.name === "getProductErr":
      break;
  }
}

