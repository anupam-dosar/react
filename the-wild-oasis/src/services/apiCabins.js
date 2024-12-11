import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log("failed to load cabins");
    throw new Error("failed to load cabins");
  }

  return data;
}
