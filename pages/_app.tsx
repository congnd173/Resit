import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import Layout from "@/components/Layout";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import EditModal from "@/components/modals/EditModal";
import "@/styles/globals.css";
import useCurrentUser from "@/hooks/useCurrentUser";
import ManagerLayout from "@/components/ManagerLayout";
import CategoryModal from "@/components/modals/CategoryModal";

export default function App({ Component, pageProps }: AppProps) {
  const { data: current } = useCurrentUser();
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <LoginModal />
      <EditModal />
      <CategoryModal />
      <RegisterModal />

      {!current?.currentUser.role && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
      {current?.currentUser.role === "STAFF" && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
      {current?.currentUser.role === "QA_COORDINATOR" && (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
      {current?.currentUser.role === "QA_MANAGER" && (
        <ManagerLayout>
          <Component {...pageProps} />
        </ManagerLayout>
      )}
    </SessionProvider>
  );
}
