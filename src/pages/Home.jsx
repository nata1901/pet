import { useContext } from "react";

import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Adds from "../components/Adds";
import News from "../components/News";
import Carousel from "../components/Carousel";
import Card  from "../components/Card";


import MainCtx from "../context/main";

import bannersData from "../assets/data/banners.json";
import addsData from "../assets/data/adds.json";
import goodsData from "../assets/data/goods.json";

export function Home () {
    const { news, newsLenta } = useContext(MainCtx);
    const favGoods = goodsData.filter(el => el.reviews.length !== 0).sort((a,b) => {
        const aSum = a.reviews.reduce((acc, el) => acc + el.rating, 0) / a.reviews.length;
        const bSum = b.reviews.reduce((acc, el) => acc + el.rating, 0) / b.reviews.length;
        console.log(aSum, bSum);
        return bSum - aSum;
    });
    const newGoods = [...goodsData].sort((a,b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    });
    return <>
        <Banner {...bannersData[2]} pattern={false} bgPos="50% 38%"/>
        <Layout>
            <Adds {...addsData[0]}/>
        </Layout>
        {newGoods.length > 0 && <Layout mb={2} dt={4} title="Новинки">
            {newGoods.map(el => <Card key={el._id} {...el}/>)}
        </Layout>}
        {news.length > 0 && <Layout mb={2} dt={4} title="Новости о собачках">
            {<Carousel
                data={news.map((el, i) => <News key={`new-${i}`} data={el} isTitled={true} />)}
                cnt={window.innerWidth < 1064 ? 2 : 4}
            />}
        </Layout>}
        <Layout dt={2}>
            <Adds {...addsData[1]}/>
            <Adds {...addsData[2]}/>
        </Layout>
        {favGoods.length > 0 && <Layout mb={2} dt={4} title="Популярные товары">
            {favGoods.map(el => <Card key={el._id} {...el}/>)}
        </Layout>}
        {newsLenta.length > 0 && <Layout mb={1} dt={2} title="Новости Lenta.ru">
           <Carousel
                data={newsLenta.map((el, i) => <News key={`new-${i}`} data={el}/>)}
                cnt={window.innerWidth < 1064 ? 1 : 2}
            />
        </Layout>}
        <Layout dt={2}>
            <Adds {...addsData[3]}/>
            <Adds {...addsData[4]}/>
        </Layout>
         {/* TODO: не забыть фильтровать недавно просмотренные товары */}
         {goodsData.length > 0 && <Layout mb={2} dt={4} title="Недавно просмотренные">
            {goodsData.map(el => <Card key={el._id} {...el}/>)}
        </Layout>}
        <Layout>
            <Adds {...addsData[5]}/>
        </Layout>
    </>
}