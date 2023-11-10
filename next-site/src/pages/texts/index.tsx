/** @format */

import React, { Fragment } from "react";

import type { NextPageWithLayout } from "../_app";

import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { queryTexts } from "@/services";

import { Text } from "@/services/API";


export const getServerSideProps: GetServerSideProps = (async (context) => {
    const { query } = context
    const res = await queryTexts({ ...query })
    return { props: { res: res } }
})

const Home: NextPageWithLayout = ({ res }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <div id='home'>
                <div>home</div>
                <ul>
                    {
                        res.data.map((item: Text) => <li key={item.id}>
                            {item.id}-{item.title}
                        </li>)
                    }
                </ul>
            </div>
        </>
    );
};


export default Home;
