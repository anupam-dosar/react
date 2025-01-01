import supabase from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });

  if (error) {
    console.error("error", error);
    throw new Error("Signup failed. Please try again.");
  }

  return data;
}

export async function login(credentials) {
  const { error } = await supabase.auth.signIn(credentials);

  if (error) {
    console.error("error", error);
    throw new Error("Login failed. Please try again.");
  }

  return getUser();
}

export async function getUser() {
  const session = supabase.auth.session();

  if (!session) {
    return null;
  }

  const user = supabase.auth.user();

  if (user === null) {
    throw new Error("Failed to fetch user");
  }

  console.log("user", user);
  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("error", error);
    throw new Error("Logout failed. Please try again.");
  }
}
