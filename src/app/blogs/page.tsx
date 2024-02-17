'use client'
import AppTable from '@/components/app.table'
import React from 'react'
import useSWR from 'swr'

function BlogsPage() {
  const fetcher = (url: string) => fetch(url)
    .then((res => res.json()))

  const { data, error, isLoading } = useSWR(
    'https://65cf76e9bdb50d5e5f5b5bcd.mockapi.io/apifake/blogs',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  if (isLoading) {
    return <div> Loading... </div>
  }
  return (
    <div>
      <AppTable blogs={data?.sort((a: any, b: any) => b.id - a.id)} />
    </div>
  )
}

export default BlogsPage