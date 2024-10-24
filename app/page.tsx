import Image from "next/image";
import styles from "./page.module.css";

import { API_URL } from "@/shared/api";
import { Home } from "@/pages/home";

export default function HomePage() {
  return <Home />;
}
