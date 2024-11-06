"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// tomo los datos del fomulario
export async function handleRegister(data: FormData) {
  const formData = {
    nombre: data.get("nombre"),
    apellido: data.get("apellido"),
    dni: data.get("dni"),
    correo: data.get("correo"),
    contrasenia_hasheada: data.get("contrasenia_hasheada"),
  };

  // me conecto con el endpoint, mi bd
  const endpoint = `${process.env.NEXT_PUBLIC_API}/register`;
  
  6
  // mando el metodo post
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });


    // y todo esto son casos de errores.
    console.log(response);
    const respData = await response.json();
    console.log(respData);
    if (!response.ok) {
      throw new Error(respData.message || "Algo salió mal.");
    }
    const cookieStore = await cookies();
    cookieStore.set("access_token", respData.access_token);
    cookieStore.set("correo", formData.correo as string);
  } catch (error) {
    console.log(error);
  }
  redirect("/");
}