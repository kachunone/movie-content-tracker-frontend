const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export class AuthService {
  static async login(credential: { email: string; password: string }) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
      cache: "no-store",
    });
    return await res.json();
  }

  static async signup(formData: {
    name: string;
    email: string;
    password: string;
  }) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
        cache: "no-store",
      }
    );
    return await res.json();
  }
}
