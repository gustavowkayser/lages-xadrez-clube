'use server'

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function registerPartnerAction(formData: FormData) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries);

  try {
    // Validate the data
    if (!data.name || !data.email || !data.phone) {
      return { status: 400, message: "Preencha todos os campos" };
    }

    // Check if the email is already in use
    const existingPartner = await db.partner.findUnique({
      where: {
        email: data.email as string,
      }
    });

    if (existingPartner) {
      return { status: 400, message: "Este e-mail já está em uso" };
    }

    const correspondingUser = await db.user.findUnique({
      where: {
        email: data.email as string,
      }
    })
      

    // Create the partner
    const partner = await db.partner.create({
      data: {
        name: data.name as string,
        email: data.email as string,
        phone: data.phone as string,
        image: correspondingUser?.image as string,
      }
    });
    
    console.log("Partner created successfully:", partner);

    return { status: 200, message: "Partner created successfully" };
  } catch (error) {
    console.error("Error creating partner:", error);
    return { status: 500, message: "Internal server error" };
  }
}

export async function deletePartnerAction(id: string, role: string | null) {
  if (role !== 'ADMIN') return { status: 401, message: "Unauthorized" };

  try {
    // Delete the partner
    await db.partner.delete({
      where: {
        id: id,
      }
    });

    console.log("Partner deleted successfully");
    return { status: 200, message: "Partner deleted successfully" };
  } catch (error) {
    console.error("Error deleting partner:", error);
    return { status: 500, message: "Internal server error" };
  }
}