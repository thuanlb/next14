import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

interface IProps {
  showModalUpdate: boolean;
  setShowModalUpdate: (value: boolean) => void;
  blog: IBlog | null;
  setBlog: (value: IBlog | null) => void
}

function UpdateModal(props: IProps) {
  const { showModalUpdate, setShowModalUpdate, blog, setBlog } = props

  const [id, setId] = useState<number>(0)
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    if (blog && blog.id) {
      setId(blog.id)
      setTitle(blog.title)
      setAuthor(blog.author)
      setContent(blog.content)
    }
  }, [blog])

  const handleSubmit = () => {
    if (!title) {
      toast.error('Not empty title !')
      return
    }
    if (!author) {
      toast.error('Not empty author !')
      return
    }
    if (!content) {
      toast.error('Not empty content !')
      return
    }

    fetch(`https://65cf76e9bdb50d5e5f5b5bcd.mockapi.io/apifake/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, author, content })
    }).then(res => res.json())
      .then(res => {
        if (res) {
          toast.success('Update blog success !...')
          handleCloseModal()
          mutate('https://65cf76e9bdb50d5e5f5b5bcd.mockapi.io/apifake/blogs')
        }
      });
  }

  const handleCloseModal = () => {
    setTitle('')
    setAuthor('')
    setContent('')
    setBlog(null)
    setShowModalUpdate(false)
  }
  return (
    <>
      <Modal
        show={showModalUpdate}
        onHide={() => handleCloseModal()}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new a blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Title..." value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" placeholder="Author..." value={author} onChange={(e) => setAuthor(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" placeholder="Content..." rows={3} value={content} onChange={(e) => setContent(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseModal()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateModal;