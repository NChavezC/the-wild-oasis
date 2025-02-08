import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could NOT be loaded.");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", [id]);

  if (error) {
    console.error(error);
    throw new Error("Cabins could NOT be deleted.");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  console.log(hasImagePath);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;
  //https://ycstdykzvzjkwsiepfau.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  //1. Create/Edit Cabin
  let query = supabase.from("cabins");

  //A) CREATE
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  //B)EDIT
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", [id]);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(
      `${id ? "Cabin could NOT be updated" : "Cabin could NOT be created"}`
    );
  }

  //2. Upload Image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  //3. Delete cabin if error:
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", [data.id]);
    console.log(storageError);
    throw new Error(
      "Cabins image could NOT be uploaded and the cabin was NOT created"
    );
  }
  return data;
}
