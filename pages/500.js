import React from 'react';
import Head from 'next/head';
import Footer from '../components/footer';
const Custom500 = () => {
  
  return (
    <>
    <Head>
        <title>500: INTERNAL_SERVER_ERROR</title>
        <link rel="icon" href="data:," />

    </Head>
    <main class="view-port" >
        <div class="container-error">
            <div class="view-port error">
                    <div>
                        <p class="error-title error-title-guilty">
                            <stronger>This Serverless Function</stronger>
                            <span> has crashed.</span>
                        </p>
                        <p class="error-title error-title-innocent">
                            <stronger>Your connection</stronger>
                            <span> is working correctly.</span>
                        </p>
                        <p class="error-title error-title-innocent">
                            <stronger>Vercel</stronger>
                            <span> is working correctly.</span>
                        </p>
                    </div>
                    <p class="devinfo-container">
                        <span class="error-code">
                            <stronger>500</stronger>
                            : INTERNAL_SERVER_ERROR
                        </span>
                        <span class="devinfo-error">Code: <code>FUNCTION_INVOCATION_FAILED</code></span>
                        <span class="devinfo-error">ID:{' '}                                 
                            <code>bom1::x94bg-1724137123895-d9a61c79c56f</code>
                            </span>
                    </p>
                    <p>
                    </p>
                    <ul>
                        <li>If you are a visitor, contact the website owner or try again later.</li>
                            <li class="owner-error">If you are the owner, <a target="_blank" href="https://vercel.com/docs/error/application/FUNCTION_INVOCATION_FAILED" rel="noopener noreferrer">learn how to fix the error</a> and <a href="/_logs?requestId=bom1::x94bg-1724137123895-d9a61c79c56f" target="_blank">check the logs</a>.
                        </li>
                    </ul>
                    <p>
                    </p>
            </div>
        </div>
    </main>
    </>
  );
  
};

export default Custom500;
