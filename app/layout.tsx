import type { Metadata } from "next";
import { Inter, Work_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Room } from "./(liveblocks)/Room";

const workSans = Work_Sans({
	subsets: ["latin"],
	variable: "--font-work-sans",
	weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
	title: "Figma clone  ",
	description: "A minimalist figma clone using Fabris.js and Liveblocks for real time collaboration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html lang='en'>
			<body className={`${workSans.className} bg-primary-grey-200`}>
				<Room>{children}</Room>
			</body>
		</html>
	);
}
