export const metadata = {
  title: "App Router",
};

import Link from "next/link";

export default function Page() {
  return (
    <>
      Interview project. See <Link href={"/example"}>example</Link>
    </>
  );
}
