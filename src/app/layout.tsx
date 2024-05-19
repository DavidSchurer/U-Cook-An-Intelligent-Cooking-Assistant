import { InputProvider } from 'compo/global/context/InputContext';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import 'styles/globals.scss';
import 'regenerator-runtime/runtime';
import Script from 'next/script';

export const metadata: Metadata = {
    title: "U-Cook | An Intelligent Cooking Collaboration Assistant",
    description: "An Intelligent Cooking Collaboration Assistant",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" href="/favicon-dark.ico" media="(prefers-color-scheme: dark)"/>
            </head>
            <body>
                <InputProvider>
                    {children}
                </InputProvider>
            </body>
        </html>
    );
}
