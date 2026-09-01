import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(request) {
  try {
    const body = await request.json();

    const { name, email, phone, message } = body;

    // Validation
    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and email are required",
        },
        { status: 400 }
      );
    }

    // Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Save data
    const { data, error } = await supabase
      .from("form_submissions")
      .insert([
        {
          name,
          email,
          phone,
          message,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    // Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Form Submission <onboarding@resend.dev>",
      to: [process.env.ADMIN_EMAIL],
      subject: `New Form Submission from ${name}`,
      html: `
        <h2>New Form Submission</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p><strong>Message:</strong></p>
        <p>${message || "-"}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      data,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}