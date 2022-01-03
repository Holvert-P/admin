import React, { useState } from "react"
import Modal from "../../molecules/modal"
import Button from "../../button"
import Medusa from "../../../services/api"
import useMedusa from "../../../hooks/use-medusa"
import InputField from "../../input"

const InviteModal = ({ handleClose }) => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState("member")
  const { toaster } = useMedusa("collections")

  const handleSubmit = e => {
    e.preventDefault()

    setIsLoading(true)

    const values = {
      user: email,
      role,
    }

    Medusa.invites
      .create(values)
      .then(res => {
        setIsLoading(false)
        handleClose()
        toaster("user(s) invited", "success")
      })
      .catch(error => {
        setIsLoading(false)
        toaster("Could not add user(s)", "error")
        handleClose()
      })
  }

  return (
    <Modal handleClose={handleClose}>
      <Modal.Body >
        <Modal.Header handleClose={handleClose}>
          <span className="text-large font-semibold">Invite Users</span>
        </Modal.Header>
        <Modal.Content>
            <InputField
              placeholder="lebron@james.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
        </Modal.Content>
        <Modal.Footer>
          <div className="flex w-full justify-end">
            <Button mr={2} variant="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button loading={isLoading} onClick={handleSubmit} variant="cta">
              Invite
            </Button>
          </div>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  )
}

export default InviteModal