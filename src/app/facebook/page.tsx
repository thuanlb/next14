'use client'

import { useRouter } from 'next/navigation'
import { Button } from 'react-bootstrap'


function Facebook() {
  const router = useRouter()
  const handleClick = () => {
    router.push("/")
  }
  return (
    <div>Facebook
      <Button variant='danger'>hoi Dna It</Button>
      <button onClick={() => handleClick()}>back home</button>
    </div>

  )
}

export default Facebook