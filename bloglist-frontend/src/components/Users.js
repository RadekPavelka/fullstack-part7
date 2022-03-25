import { Link } from 'react-router-dom'


const Users = ({ users }) => {
  return (
    users && (
      <div>
        <h2>Users</h2>
        <table>
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
        </table>
      </div>
    )
  )
}

export default Users