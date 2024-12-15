import supabase, { supabaseUrl } from "./supabase";

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

export async function processCabin(cabinData, id) {
  console.log(cabinData, id);
  const hasImagePath = cabinData.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${cabinData.image?.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // upload Image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabinData.image);

  // Delete cabin if storage error happens
  if (storageError) {
    console.log(storageError);
    throw new Error("failed to add cabin: image upload failed");
  }

  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...cabinData, image: imagePath }]);
  } else {
    query = query.update({ ...cabinData, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error(`failed to ${id ? "update" : "add"} cabin`);
  }

  return data;
}
