export async function POST(req: Request) {
  try {
    const { email, password, username, role } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email dan password wajib" }),
        { status: 400 }
      );
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, username, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(JSON.stringify({ message: data.message || "Gagal registrasi" }), {
        status: res.status,
      });
    }

    return new Response(JSON.stringify({ message: "Registrasi berhasil", user: data.user }), {
      status: 201,
    });
  } catch (error) {
    console.error("Registrasi error:", error);
    return new Response(JSON.stringify({ message: "Terjadi kesalahan" }), { status: 500 });
  }
}
