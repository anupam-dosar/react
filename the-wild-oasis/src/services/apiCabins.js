import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("failed to load cabins");
  }

  return data;
}

export async function deleteCabin(cabinId) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", cabinId);

  if (error) {
    console.log(error);
    throw new Error("failed to delete cabin");
  }

  return data;
}
