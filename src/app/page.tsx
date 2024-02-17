'use client'
import Link from "next/link";
import style1 from '@/styles/app.module.css'
import style2 from '@/styles/hoidanit.module.css'

export default function Home() {

  return (
    <>
      <ul>
        <li className={style1['red']}>
          <Link href={"/facebook"}>
            <span className={style2['red']}>Facebook</span>
          </Link>
        </li>
        <li style={{ margin: '20px 0' }}>
          <Link href={'/youtube'}>
            Youtube
          </Link>
        </li>
        <li>
          <Link href={'/tiktok'}>
            Tiktok
          </Link>
        </li>
      </ul >
    </>
  );
}
