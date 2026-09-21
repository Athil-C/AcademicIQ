import { redirect } from "next/navigation";

export default function SSRFRedirectPage() {
  redirect("/communities/ssrf");
}
