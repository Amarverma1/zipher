import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      fullName,
      username,
      email,
      zipCode,
      city,
      country,
      gender,
      age,
      subsidyBenefit,
      eligibility,
      healthMedicare,
      query,
    } = body;

    // Basic Validation
    if (!fullName || !username || !email || !gender) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Full name, username, email and gender are required.",
        },
        { status: 400 }
      );
    }

    // Supabase Server Client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Save Data in Supabase
    const { data, error } = await supabase
      .from("form_submissions")
      .insert([
        {
          full_name: fullName,
          username: username,
          email: email,
          zip_code: zipCode,
          city: city,
          country: country,
          gender: gender,
          age: age ? Number(age) : null,
          subsidy_benefit: subsidyBenefit,
          eligibility: eligibility,
          health_medicare: healthMedicare,
          query: query,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase Error:", error);

      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 }
      );
    }

    // Resend Email
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Zipher Form <onboarding@resend.dev>",
      to: [process.env.ADMIN_EMAIL],
      subject: `New Zipher Form Submission - ${fullName}`,

      html: `
        <h2>New Zipher Data Policy Submission</h2>

        <hr />

        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>

        <hr />

        <p><strong>Zip Code:</strong> ${zipCode || "-"}</p>
        <p><strong>City:</strong> ${city || "-"}</p>
        <p><strong>Country:</strong> ${country || "-"}</p>

        <hr />

        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Age:</strong> ${age || "-"}</p>

        <hr />

        <p><strong>Subsidy Benefit:</strong> ${
          subsidyBenefit || "-"
        }</p>

        <p><strong>Eligibility:</strong> ${
          eligibility || "-"
        }</p>

        <p><strong>Health Medicare:</strong> ${
          healthMedicare || "-"
        }</p>

        <hr />

        <h3>User Query</h3>

        <p>${query || "-"}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully!",
      data,
    });

  } catch (error) {
    console.error("Server Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}