import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
  return (
    users && (
      <div>
        <h2>Users</h2>
        <Table striped hover bordered>
          <thead>
            <tr>
              <th>username</th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.noOfBlogs}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  )
}

export default Users
