import {useRouter} from "next/router";

export default function CoffeeStoreSingle() {
    const {query: {cid}} = useRouter();

    return <p>Coffee Store: {cid}</p>
}