import { useRouter } from 'next/router'
import { useRef } from 'react'
import Link from 'next/link';
import coffeeStoresData from '../../data/coffee-stores.json'
import styles from '../../styles/coffee-store.module.css';
import Head from 'next/head';
import Image from "next/image";
import cls from 'classnames'
import { fetchCooffeeStores } from '../../lib/coffee-store';


export async function getStaticProps(staticProps) {
    const coffeeStores = await fetchCooffeeStores();
    const params = staticProps.params;
    return {
        props: {
            coffeeStores: coffeeStores.find(coffeeStore => {
                return coffeeStore.id.toString() === params.id;
            })
        }, // will be passed to the page component as props
    }
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCooffeeStores();
    const paths = coffeeStores.map((post) => ({
        params: { id: post.id.toString() },
    }))
    return { paths, fallback: false }
}


const CoffeeStore = (props) => {
    const router = useRouter();
    const query = router.query;

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const { name, address, locality, imgUrl } = props.coffeeStores;

    const handleUpvoteButton = () => {
        console.log('upvote');
    }

    console.log(props, 'props');
    return (
        <div>
            <div className={styles.layout}>
                <Head>
                    <title>{name}</title>
                </Head>
                <div className={styles.container}>
                    <div className={styles.col1}>
                        <div className={styles.backToHomeLink}>
                            <Link href="/">
                                <a>←Back to home</a>
                            </Link>
                        </div>
                        <div className={styles.nameWrapper}>
                            <h1 className={styles.name}>{name}</h1>
                        </div>

                        <Image
                            src={imgUrl}
                            width={600}
                            height={360}
                            className={styles.storeImg}
                            alt={name}
                        />

                    </div>

                    <div className={cls("glass", styles.col2)}>
                        <div className={styles.iconWrapper}>
                            <Image src='/static/icons/places.svg' width='24' height='24' />
                            <p className={styles.text}>{address}</p>
                        </div>
                        <div className={styles.iconWrapper}>
                            <Image src='/static/icons/nearMe.svg' width='24' height='24' />
                            <p className={styles.text}>{locality}</p>
                        </div>
                        <div className={styles.iconWrapper}>
                            <Image src='/static/icons/star.svg' width='24' height='24' />
                            <p className={styles.text}>1</p>
                        </div>

                        <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Up vote!</button>

                    </div>
                </div>
            </div>
        </div>
    );
};


export default CoffeeStore;