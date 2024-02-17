'use client'
import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import CreateModal from './create.modal'
import UpdateModal from './update.modal'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { mutate } from 'swr'

interface IProps {
  blogs: IBlog[]
}

function AppTable(props: IProps) {
  const { blogs } = props

  const [blog, setBlog] = useState<IBlog | null>(null)

  const [showModalCreate, setShowModalCreate] = useState<boolean>(false)
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false)

  const handleDeleteBlog = (id: number) => {
    if (confirm(`Do you want to delete this blog (id = ${id})`)) {
      fetch(`https://65cf76e9bdb50d5e5f5b5bcd.mockapi.io/apifake/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
      }).then(res => res.json())
        .then(res => {
          if (res) {
            toast.success('Delete blog sucess')
            mutate('https://65cf76e9bdb50d5e5f5b5bcd.mockapi.io/apifake/blogs')
          }
        });
    }
  }


  return (
    <>
      <div className='my-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h3>Table Blogs</h3>
        <Button variant='secondary' onClick={() => setShowModalCreate(true)}>Add new</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <Button>
                    <Link href={`/blogs/${item.id}`}>View</Link>
                  </Button>
                  <Button variant='warning' className='mx-3'
                    onClick={() => {
                      setBlog(item);
                      setShowModalUpdate(true)
                    }}>Edit
                  </Button>
                  <Button variant='danger' onClick={() => handleDeleteBlog(item.id)}>Delete</Button>
                </td>
              </tr>
            )
          })}

        </tbody>
      </Table>
      <CreateModal showModalCreate={showModalCreate} setShowModalCreate={setShowModalCreate} />
      <UpdateModal showModalUpdate={showModalUpdate} setShowModalUpdate={setShowModalUpdate} blog={blog} setBlog={setBlog} />
    </>
  )
}

export default AppTable