'use client'
import React from 'react'
import Card from 'react-bootstrap/Card';
import useSWR, { Fetcher } from 'swr';

function ViewDetailBlog({ params }: { params: { slug: string } }) {
  const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url)
    .then((res => res.json()))

  const { data, error, isLoading } = useSWR(
    `https://65cf76e9bdb50d5e5f5b5bcd.mockapi.io/apifake/blogs/${params.slug}`,
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
      <Card className="text-center">
        <Card.Header>{data?.title}</Card.Header>
        <Card.Body>
          <Card.Text>
            {data?.content}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{data?.author}</Card.Footer>
      </Card>

    </div>
  )
}

export default ViewDetailBlog