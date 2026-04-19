import { useEffect } from "react";
import { useRouter } from "next/router";
import * as gtag from "../lib/gtag";
import { motion, AnimatePresence } from "framer-motion";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "materialize-css/dist/css/materialize.min.css";
import "slick-carousel/slick/slick.css";
import "../styles/style.scss";
import '../styles/500.scss';
import "../styles/QuranSlider.scss";
import '../styles/globals.css';
import Layout from "../components/layout";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof gtag.pageview === 'function') {
        gtag.pageview(url);
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default App;