import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    data: { fullName, avatar: "" },
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

  // console.log("user", user);
  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("error", error);
    throw new Error("Logout failed. Please try again.");
  }
}

export async function updateUserData({ password, fullName, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.update(updateData);

  if (error) {
    console.error("error", error);
    throw new Error("Update failed. Please try again.");
  }

  if (!avatar) return data;

  const fileName = `${data.id}-${Math.random()}-${avatar.name}`;

  const { error: storageError } = await supabase.storage.from("avatars").upload(fileName, avatar);

  if (storageError) {
    console.error("error", storageError);
    throw new Error("Update failed. Please try again.");
  }

  const { data: updatedUser, error: updateError } = await supabase.auth.update({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (updateError) {
    console.error("error", updateError);
    throw new Error("Update failed. Please try again.");
  }

  return updatedUser;
}
