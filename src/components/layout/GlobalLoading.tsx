import Image from "next/image";

export default function GlobalLoading() {
    return (
        <div className="global-loading-wrapper">
            <Image src="/assets/favicon-white.png" alt="" width={100} height={100} />
        </div>
    );
}
