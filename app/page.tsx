import Image from "next/image";
import styles from "./page.module.css";

import { Authorization } from "@/pages/authorization";
import { API_URL } from "@/shared/api";

export default function Home() {
  console.log(API_URL);

  return (
    <div>
      <Authorization />
    </div>
  );
}
